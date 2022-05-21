import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function changeChroniclePosition(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;

  if (type) {
    const { position, direction, lastPosition, chronicle } = body;

    if (position === 0 && direction === "up") {
      return res.status(400).send("Often on top");
    }

    if (position === lastPosition) {
      return res.status(400).send("Often on bottom");
    }

    const newPosition =
      direction === "up" ? chronicle.position - 1 : chronicle.position + 1;

    if (chronicle.showId) {
      await prisma.chronicle.updateMany({
        where: {
          position: newPosition,
          showId: chronicle.showId,
        },
        data: {
          position: chronicle.position,
        },
      });
      await prisma.chronicle.update({
        where: {
          id: chronicle.id,
        },
        data: {
          position: newPosition,
        },
      });
      await prisma.show.update({
        where: { id: chronicle.showId },
        data: { trigger: new Date() },
      });
    }

    return res.send("ok");
  } else {
    res.status(403).send("problem with show.");
  }
}
