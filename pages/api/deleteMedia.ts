import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";
const prisma = new PrismaClient();

export default async function deleteMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;

  if (type) {
    const  
    show = await prisma.show.findUnique({
        where: { [type]: body.token },
      });
      if(!show) return res.send('No show find.');

      const currentMedia = await prisma.media.findUnique({
      where: { id: body.id },
    });
    await prisma.media.updateMany({
      where: {
        chronicleId: body.chronicleId,
        position: {
          gt: currentMedia.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });

    await prisma.show.update({where: {id: show.id}, data:{ trigger: new Date()}});
    await prisma.media.delete({
      where: {
        id: body.id,
      },
    });
    refreshConductorSignal('admin',show.admin);
    res.send(await prisma.media.findMany({where:{chronicleId: body.chronicleId}, orderBy:{position:'asc'}}));
  } else {
    res.status(403).send("problem with show.");
  }
}
