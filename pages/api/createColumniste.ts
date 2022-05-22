import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import {prisma} from '../../db/db';

export default async function createColumniste(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);
  if (type) {
    const { token, name } = req.body;
    if (
      token &&
      typeof token === "string" &&
      name &&
      typeof name === "string"
    ) {
      const show = await prisma.show.findUnique({
          where: { [type]: token },
        }),
        columnist = await prisma.columnist.create({
          data: {
            name,
            showId: show.id,
          },
        });
      await prisma.show.update({
        where: { id: show.id },
        data: { trigger: new Date() },
      });
      res.json(columnist);
    } else {
      res.status(403).send("Problem with payload");
    }
  }
}
