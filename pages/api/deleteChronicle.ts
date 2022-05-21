import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function deleteChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;

  if (type) {
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
    
    res.send("done");
  } else {
    res.status(403).send("problem with show.");
  }
}
