import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";
const prisma = new PrismaClient();

export default async function deleteColumnist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin"]),
    { body } = req;

  if (type && body) {
    const show = await prisma.show.findFirst({ where: { admin: body.token } });

    if (!show) res.status(403).send("problem with show.");

    const deleteColumnistChronicles =  prisma.chronicle.deleteMany({
        where: {
            columnistId: body.columnist.id,
        },
      });
      
    const deleteColumnist =  prisma.columnist.delete({
      where: {
        id: body.columnist.id,
      },
    });
    const transaction = await prisma.$transaction([deleteColumnistChronicles, deleteColumnist])

    refreshConductorSignal("admin", show.admin);
    res.send("done");
  } else {
    res.status(403).send("problem with show.");
  }
}
