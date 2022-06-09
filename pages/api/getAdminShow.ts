import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { prisma } from "../../db/db";
import commonControl from "../../utils/commonControl.middleware";

export default async function getAdminShow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);
  if (type) {
    const show = await prisma.show.findUnique({
      where: { [type]: req.body.token },
      select: {
        title: true,
        trigger: true,
        _count:{
            select: {chronicles:true}
          }
  
      },
    });
    return show ? res.json(show) : res.status(404).send("not found");
  }
}
