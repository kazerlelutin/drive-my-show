import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import commonControl from "../../utils/commonControl.middleware";
import axios from "axios";
const prisma = new PrismaClient();

export default async function broadcast(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor", "reader"]);

  if (type) {
    const { body } = req,
      { media, token } = body,
      show = await prisma.show.findFirst({
        where: {
          [type]: token,
          chronicles: {
            some: {
              medias: {
                some: {
                  id: media.id,
                },
              },
            },
          },
        },
      });
    if (!show) return res.status(404).send("Not found associate show");

    await axios.post(
      process.env.NEXT_PUBLIC_URL_LIVE + "/broadcast",
      {
        media,
        token:show.reader,
        type,
      }
    );
    return res.send("done");
  }
}
