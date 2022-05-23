import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";
const prisma = new PrismaClient();

export default async function updateChroniclePosition(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;

  if (type && body) {
    const show = await prisma.show.findFirst({ where: { [type]: body.token } });
    if (!show) res.status(403).send("problem with show.");

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

    refreshConductorSignal('admin',show.admin);
    return res.send("ok");
  } else {
    res.status(403).send("problem with show.");
  }
}
