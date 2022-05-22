import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import refreshConductorSignal from "../../utils/refreshConductorSignal";
import {prisma} from '../../db/db';

export default async function updateChronicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]),
    { body } = req;
  if (type && body) {
    const show = await prisma.show.findFirst({ where: { [type]: body.token } });

    if (!show) res.status(403).send("problem with show.");

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

    await prisma.show.update({
      where: { id: chronicle.showId },
      data: { trigger: new Date() },
    });
    refreshConductorSignal("admin", show.admin);
    res.send(chronicle);
  } else {
    res.status(403).send("problem with show.");
  }
}
