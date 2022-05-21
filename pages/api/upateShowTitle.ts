import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function upateShowTitle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin"]),
    { body } = req;
  if (type) {
    const { token, title } = body;

    if (!title) res.status(403).send("No title sended.");

    const show = await prisma.show.update({
      where: {
        admin: token,
      },
      data: {
        title: title,
        trigger: new Date()
      },
    });
    res.send(show);
  } else {
    res.status(403).send("problem with show.");
  }
}
