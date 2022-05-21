import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import commonControl from '../../utils/commonControl.middleware';
const prisma = new PrismaClient();

export default async function getAdminShow(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const type = commonControl(req, res, ["admin", "editor"]);
  //TODO voir à faire une requête séparée pour les chroniques
  if(type){
    const show = await prisma.show.findUnique({
      where: { [type]: req.body.token },
      select: {
        title: true,
        trigger:true
      },
    });
    return show ? res.json(show): res.status(404).send('not found');
  }
}
