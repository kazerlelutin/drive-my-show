import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
const prisma = new PrismaClient();

export default async function createMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);

  //TODO connect bucket for save img
  if (type) {
    const { token, title, chronicleId, data, link, type:typeMedia } = req.body;
    if (token && typeof token === "string") {
      if (!data && !link) return res.status(403).send("No Link or data");

      const show = await prisma.show.findUnique({
          where: { [type]: token },
        }),
        lastMedia = await prisma.media.findFirst({
          where: {
            chronicleId,
          },
          orderBy: {
            position: "desc",
          },
        });

       await prisma.media.create({
        data: {
          link,
          data,
          title,
          type:typeMedia,
          position: lastMedia ?lastMedia.position + 1 : 1,
          chronicle: {
            connect: {
              id: chronicleId,
            },
          },
        },
      });

      await prisma.show.update({
        where: { id: show.id },
        data: { trigger: new Date() },
      });

     res.send(await prisma.media.findMany({where:{chronicleId}}));
    } else {
      res.status(403).send("Problem with payload");
    }
  }
}
