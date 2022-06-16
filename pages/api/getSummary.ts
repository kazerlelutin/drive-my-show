import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import commonControl from "../../utils/commonControl.middleware";
import { prisma } from "../../db/db";
import {ChronicleState } from "@prisma/client";


export default async function getChronicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = commonControl(req, res, ["admin", "editor"]);
  
  if (type) {
    const inState: Array<ChronicleState> = ['publish'];
    
    if(!req.body.route.match(/conductor|resume/)){
      inState.push('draft');
      inState.push('read');
    }

    const chronicles = await prisma.chronicle.findMany({
      where: {
        show: { [type]: req.body.token },
        state:{in:inState}
      },
      select:{
        title:true,
        position:true,
        id:true,
        state:true,
        columnist: {
          select: {
            name:true,
          }
        }
      },
      orderBy: {
        position: "asc",
      },
    });
    return chronicles
      ? res.json(chronicles)
      : res.status(404).send("not found");
  }
}
