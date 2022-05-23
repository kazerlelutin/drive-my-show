import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";
import { prisma } from "../../db/db";

export default async function updateShowTitle(
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
        trigger: new Date(),
      },
    });
    refreshConductorSignal(type, token);
    res.send(show);
  } else {
    res.status(403).send("problem with show.");
  }
}
