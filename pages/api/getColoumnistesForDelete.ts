import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function getColoumnistsCounters(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin"]);
  if (type) {
    const columnists = await prisma.columnist.findMany({
      where: {
        show: {
          admin: req.body.token,
        },
      },
      include: {
        _count: {
          select: { chronicles: true },
        },

      }
    });

    return columnists
      ? res.json(columnists)
      : res.status(404).send("not found");
  }
}
