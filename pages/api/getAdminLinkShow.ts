import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import { prisma } from "../../db/db";

export default async function getAdminLinkShow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin"]);
  if (type) {
    const show = await prisma.show.findUnique({
      where: { admin: req.body.token },
      select: {
        title: true,
        admin: true,
        reader: true,
        editor: true,
      },
    });
    return show ? res.json(show) : res.status(404).send("not found");
  }
}
