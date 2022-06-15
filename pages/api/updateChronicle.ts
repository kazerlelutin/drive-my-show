import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import commonControl from '../../utils/commonControl.middleware';
import refreshConductorSignal from '../../utils/refreshConductorSignal';
import { prisma } from '../../db/db';
import getMediasLimit from '../../utils/getMediasLimit';

export default async function updateChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ['admin', 'editor']),
    { body } = req;
  if (type && body) {
    const show = await prisma.show.findFirst({ where: { [type]: body.token } });

    if (!body.columnist && body.state !== 'draft') {
      return res.status(403).send('If not draft,you must have a columnist.');
    }

    if (!show) res.status(403).send('problem with show.');

    const updateData: any = {
      where: {
        id: body.id,
      },
      data: {
        title: _.get(body, 'title'),
        content: _.get(body, 'content'),
        link: _.get(body, 'link', ''),
        duration: parseInt(_.get(body, 'duration', 0)),
        state: _.get(body, 'state', 'draft'),
      },
    }

    if(body.columnist){
      updateData.data.columnist=  {
        connect: {
          id: body.columnist.value,
        },
      }
    }else {
      updateData.data.columnistId = null;
    }
    const chronicle = await prisma.chronicle.update(updateData);

    await prisma.media.deleteMany({
      where: {
        id: {
          not: {
            in: body.medias.filter((o: any) => !!o.id).map((o: any) => o.id),
          },
        },
        chronicleId: body.id,
      },
    });

    const newMedias = body.medias.filter((o: any) => !o.id);

    const count = await prisma.media.count({ where: { chronicleId: body.id } });

    if (count + newMedias.length >= getMediasLimit())
      return res.status(403).send("You can't create more medias.");

    if (newMedias.length > 0) {
      const select = {
          position: true,
        },
        lastVideo = await prisma.media.findFirst({
          where: {
            chronicleId: body.id,
            type: 'video',
          },
          orderBy: {
            position: 'desc',
          },
          select,
        }),
        lastImg = await prisma.media.findFirst({
          where: {
            chronicleId: body.id,
            type: 'image',
          },
          orderBy: {
            position: 'desc',
          },
          select,
        });

      //TODO refactor position, it's weird
      await prisma.media.createMany({
        data: newMedias.map((o: any, index: number) => ({
          ...o,
          chronicleId: body.id,
          title:
            o.title ||
            `#${o.type}-${
              o.type === 'image'
                ? lastImg
                  ? lastImg.position
                  : 0 + index + 1
                : lastVideo
                ? lastVideo.position
                : 0 + index + 1
            }`,
          position:
            o.type === 'image'
              ? lastImg
                ? lastImg.position
                : 0 + index + 1
              : lastVideo
              ? lastVideo.position
              : 0 + index + 1,
        })),
      });
    }
    await prisma.show.update({
      where: { id: chronicle.showId },
      data: { trigger: new Date() },
    });
    refreshConductorSignal('admin', show.admin);
    res.send(chronicle);
  } else {
    res.status(403).send('problem with show.');
  }
}
