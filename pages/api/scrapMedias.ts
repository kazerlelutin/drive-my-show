import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import commonControl from '../../utils/commonControl.middleware';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { mediaList } from '../../interfaces/mediaList';
import { v4 as uuidv4 } from 'uuid';

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
      url = dom.window.document.querySelector(
        'meta[property="og:url"]'
      )?.content || link,
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

    const urlRegex = new RegExp(
      /(^https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i
    );

    const imgsMedia = Array.from(imgs)
      .filter((o: HTMLImageElement) => o?.src.match(/http/))
      .map((img: HTMLImageElement, index: number) => {
        const title = img.alt ? img.alt : url.match(urlRegex).length >= 3
        ? `${url.match(urlRegex)[2]}-${index}`
        : uuidv4() 
        return {
          link: img.src,
          source: url,
          title,
          type: 'image',
        }
  });

   

    medias.imgs = imgsMedia.filter((o, index) => {
      const isExist = imgsMedia
        .slice(0, index - 1)
        .find((a) => o.link === a.link);
      return !isExist;
    });

    const videosMedia = Array.from(embeds).map((video: HTMLImageElement) => ({
      src: video.src,
      title: video.getAttribute('alt'),
      source: url,
      link: video.src,
      type: 'video',
    }));

    medias.videos = videosMedia.filter((o, index) => {
      const isExist = videosMedia
        .slice(0, index - 1)
        .find((a) => o.link === a.link);
      return !isExist;
    });

    res.send(medias);
  } else {
    res.status(403).send('Problem with payload');
  }
}
