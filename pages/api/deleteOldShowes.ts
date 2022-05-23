import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { prisma } from "../../db/db";
import dayjs from "dayjs";

export default async function deleteOldShowes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.headers.authorization)
    return res.status(403).send("No authorization key");
  if (req.headers.authorization !== process.env.CRON_KEY)
    return res.status(403).send("Wrong key");

  const trigger = {
      lt: dayjs().subtract(30, "days").format(),
    },
    columnistes = prisma.columnist.deleteMany({
      where: {
        show: {
          trigger,
        },
      },
    }),
    chronicles = prisma.chronicle.deleteMany({
      where: {
        show: {
          trigger,
        },
      },
    }),
    medias = prisma.media.deleteMany({
      where: {
        chronicle: {
          show: {
            trigger,
          },
        },
      },
    }),
    showes = prisma.show.deleteMany({
      where: {
        trigger,
      },
    }),
    transaction = await prisma.$transaction([
      medias,
      chronicles,
      columnistes,
      showes,
    ]);

  res.json(transaction);
}
