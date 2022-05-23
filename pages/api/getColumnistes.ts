import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import Columnist from "../../interfaces/columnist.interface";
import commonControl from "../../utils/commonControl.middleware";
import { prisma } from "../../db/db";

export default async function getColumnistes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);

  if (type) {
    const { token, search } = req.body,
      contains = search && typeof search === "string" ? search : "";
    if (token && typeof token === "string") {
      const show = await prisma.show.findFirst({
        where: {
          [type]: token,
          columnists: {
            some: {
              name: { contains },
            },
          },
        },
        select: {
          columnists: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      res.json(
        _.get(show, "columnists", [])
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((o: Columnist) => ({
            label: o.name,
            value: o.id,
          }))
      );
    } else {
      res.status(403).send("Problem with payload");
    }
  }
}
