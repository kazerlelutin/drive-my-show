import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import { prisma } from "../../db/db";

export default async function getColoumnistsCounters(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);
  if (type) {
    const columnists = await prisma.columnist.findMany({
      where: {
        name: {
          contains: req.body.search
        },
        chronicles: {
          some: {
            show: {
              [type]: req.body.token,
            },
          },
        },
      },
      include: {
        _count: {
          select: { chronicles: true },
        },
      },
    });

    const countChronicles = await prisma.chronicle.count({
      where: {
        show: {
          [type]: req.body.token,
        },
      },
    });
    const response = { columnists, total: countChronicles };
    if (res) return res.json(response);
    return res.status(404).send("not found");
  }
}
