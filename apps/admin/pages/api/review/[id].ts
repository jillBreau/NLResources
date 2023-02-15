import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// PUT /api/review/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const resourceId = req.query.id
  const resource = await prisma.resource.update({
    where: { id: resourceId },
    data: { reviewed: req.body.reviewed },
  })
  res.json(resource)
}
