import prisma from '../../lib/prisma';

// POST /api/resource
export default async function handle(req, res) {
  const { 
    type,
    title,
    description,
    website,
    location,
    format,
    organizationId,
    volunteerUpperAge,
    volunteerLowerAge,
    volunteerGenders,
    volunteerStatus,
    participantUpperAge,
    participantLowerAge,
    participantGenders,
    participantStatus,
    organization,
   } = req.body

  console.log('log1')

  const result = await prisma.resource.create({
    data: {
      type,
      title,
      description,
      website,
      location,
      format,
      organizationId,
      volunteerUpperAge,
      volunteerLowerAge,
      volunteerGenders,
      volunteerStatus,
      participantUpperAge,
      participantLowerAge,
      participantGenders,
      participantStatus,
      organization,
    },
  })

  return res.json(result)
}