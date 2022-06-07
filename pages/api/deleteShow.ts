import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { prisma } from "../../db/db";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";

export default async function deleteShow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin"]),
    { body } = req;

  if (type && body) {
    const show = await prisma.show.findFirst({ where: { admin: body.token } });

    if (!show) res.status(403).send("problem with show.");

    const deleteColumnistChronicles = prisma.chronicle.deleteMany({
        where: {
          showId: show.id,
        },
      }),
      deleteColumnist = prisma.columnist.deleteMany({
        where: {
          showId: show.id,
        },
      }),
      deleteMedias = prisma.media.deleteMany({
        where: {
          chronicle: {
            showId: show.id,
          },
        },
      });

    await prisma.$transaction([
      deleteMedias,
      deleteColumnistChronicles,
      deleteColumnist,
    ]);
    await prisma.show.delete({
      where: {
        id: show.id,
      },
    });
    refreshConductorSignal("admin", show.admin);
    res.send("done");
  } else {
    res.status(403).send("problem with show.");
  }
}
