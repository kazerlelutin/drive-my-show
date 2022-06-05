import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import commonControl from '../../utils/commonControl.middleware';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { mediaList } from '../../interfaces/mediaList';

export default async function scrapVideoYoutube(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ['admin', 'editor']);
  if (type) {
    const { link } = req.body,
      { data } = await axios.get(link),
      dom: any = new JSDOM(data),
      preview = dom.window.document.querySelector('meta[property="og:image"]').content,
      title = dom.window.document.querySelector('meta[property="og:title"]').content,
      shortLink =  dom.window.document.querySelector('link[rel="shortlinkUrl"]').href;

    res.send({preview,title,link,source:shortLink, type:'video'});
  } else {
    res.status(403).send('Problem with payload');
  }
}