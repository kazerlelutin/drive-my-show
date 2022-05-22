import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import {prisma} from '../../db/db';

export default async function getConductor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor","reader"]);

  if (type) {
    const show = await prisma.show.findUnique({
      where: { [type]: req.body.token },
      select: {
        title: true,
        trigger: true,
        chronicles: {
          select: {
            id:true,
            title: true,
            link: true,
            content: true,
            position: true,
            duration: true,
            columnist: true,
            medias: true,
          },
          orderBy: {
            position:'asc'
          }
        },
      },
    });
    return show ? res.json(show) : res.status(404).send("not found");
  }
}
