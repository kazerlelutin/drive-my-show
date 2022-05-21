import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function updateChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;
  if (type) {
    const chronicle = await prisma.chronicle.update({
      where: {
        id: body.id,
      },
      data: {
        title: _.get(body, "title"),
        content: _.get(body, "content"),
        link: _.get(body, "link", ""),
        duration: parseInt(_.get(body, "duration", 0)),
        columnist: {
          connect: {
            id: body.columnist.value,
          },
        },
      },
    });

    await prisma.show.update({where: {id: chronicle.showId}, data:{ trigger: new Date()}});
    res.send(chronicle);
  } else {
    res.status(403).send("problem with show.");
  }
}
