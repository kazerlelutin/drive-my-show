import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";
import _ from "lodash";
import { prisma } from "../../db/db";
import { v4 as uuidv4 } from 'uuid';

export default async function createShow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (_.get(req, "body.title")) {
      const 
      { title }: { title: string } = req.body,
      prefix = uuidv4();

      const show = await prisma.show.create({
        data: {
          title,
          prefix,
          admin:
            prefix +
            generator.generate({
              length: 65,
              numbers: true,
            }),
          reader:
            prefix +
            generator.generate({
              length: 63,
              numbers: true,
            }),
          editor:
            prefix +
            generator.generate({
              length: 60,
              numbers: true,
            }),
        },
      });
      return res.send(show.admin);
    } else {
      res.status(400).send("No title in body");
    }
  } else {
    res.status(405).send("Please, use POST");
  }
}
