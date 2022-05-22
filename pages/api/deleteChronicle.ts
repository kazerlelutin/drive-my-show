import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import {prisma} from '../../db/db';
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";


export default async function deleteChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;

  if (type && body) {
    const show = await prisma.show.findFirst({ where: { [type]: body.token } });

    if (!show) res.status(403).send("problem with show.");

    const currentChronicle = await prisma.chronicle.findUnique({
      where: { id: body.id },
    });
    await prisma.chronicle.updateMany({
      where: {
        showId: currentChronicle.showId,
        position: {
          gt: currentChronicle.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });

    await prisma.show.update({where: {id: currentChronicle.showId}, data:{ trigger: new Date()}});
    await prisma.chronicle.delete({
      where: {
        id: body.id,
      },
    });
    refreshConductorSignal('admin',show.admin);
    res.send("done");
  } else {
    res.status(403).send("problem with show.");
  }
}
