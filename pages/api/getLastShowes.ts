import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/db";

export default async function getLastShowes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" && Array.isArray(req.body)) {
    const showes = await prisma.show.findMany({
      where: {
        OR: req.body.map((o) => ({
          [o.type]: o.token,
        })),
      },
      orderBy: {
        trigger: "desc",
      }
    });
    return res.json(
      req.body.filter((o) => showes.find((show) => show[o.type] === o.token))
    );
  } else {
    res.status(401).send("Wrong method");
  }
}
