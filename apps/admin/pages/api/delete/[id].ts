import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// DELETE /api/delete/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const resourceId = req.query.id
  if (req.method === 'DELETE') {
    const resource = await prisma.resource.delete({
      where: { id: resourceId },
    })
    res.json(resource)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
