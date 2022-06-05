import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import commonControl from '../../utils/commonControl.middleware';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { mediaList } from '../../interfaces/mediaList';

export default async function scrapMedias(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ['admin', 'editor']);
  //TODO connect bucket for save img
  if (type) {
    const { link } = req.body,
      { data } = await axios.get(link),
      dom: any = new JSDOM(data),
      cover = dom.window.document.querySelector('meta[property="og:image"]'),
      url = dom.window.document.querySelector('meta[property="og:url"]')?.content,
      imgs = dom.window.document.querySelectorAll('img'),
      embeds = dom.window.document.querySelectorAll('iframe'),
      medias: mediaList = {
        imgs: [],
        videos: [],
      };

    if (cover) {
      medias.cover = {
        link: cover.content,
        title: cover?.alt,
        type: 'image',
        source: url,
      };
    }

    medias.imgs = Array.from(imgs)
      .filter((o: HTMLImageElement) => o.src.match(/http/))
      .map((img: HTMLImageElement) => ({
        link: img.src,
        source: url,
        title: img.alt,
        type: 'image',
      }));

    medias.videos = Array.from(embeds).map((video: HTMLImageElement) => ({
      src: video.src,
      title: video.alt,
      source: url,
      link: video.src,
      type: 'video',
    }));

    res.send(medias);
  } else {
    res.status(403).send('Problem with payload');
  }
}
