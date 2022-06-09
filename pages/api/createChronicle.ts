import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import commonControl from '../../utils/commonControl.middleware';
import refreshConductorSignal from '../../utils/refreshConductorSignal';
import { prisma } from '../../db/db';
import getMediasLimit from '../../utils/getMediasLimit';
import getChroniclesLimit from '../../utils/getChroniclesLimit';

export default async function createChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ['admin', 'editor']),
    { body } = req;

  if (type) {
    const show = await prisma.show.findFirst({
        where: {
          [type]: body.token,
        },
        select: {
          id: true,
        },
      }),
      lastPosition = await prisma.chronicle.findFirst({
        where: {
          showId: show.id,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      });

    if (body.medias.length >= getMediasLimit())
      return res.status(403).send("You can't create more medias.");

    if (show) {
      const count = await prisma.chronicle.count({
        where: { showId: show.id },
      });
      if (count >= getChroniclesLimit())
        return res.status(403).send("You can't create more chronicles.");

      const chronicle = await prisma.chronicle.create({
        data: {
          title: _.get(body, 'title'),
          content: _.get(body, 'content'),
          link: _.get(body, 'link', ''),
          position: _.get(lastPosition, 'position', 0) + 1,
          duration: parseInt(_.get(body, 'duration', 0)),
          show: {
            connect: {
              id: show.id,
            },
          },
          columnist: {
            connect: {
              id: body.columnist.value,
            },
          },
          medias: {
            create: body.medias,
          },
        },
      });

      await prisma.show.update({
        where: { id: show.id },
        data: { trigger: new Date() },
      });
      refreshConductorSignal(type, body.token);
      res.send(chronicle);
    } else {
      res.status(403).send('problem with show.');
    }
  }
}
