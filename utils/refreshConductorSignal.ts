import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

export default async function refreshConductorSignal(
  type: string,
  token: string
): Promise<void> {
  const show = await prisma.show.findFirst({
    where: { [type]: token },
    select: {
      admin: true,
      reader: true,
      editor: true,
    },
  });

  if (show) {
    //no need to wait response.
    axios.post(process.env.NEXT_PUBLIC_URL_LIVE + "/refreshConductor", show);
  }
}
