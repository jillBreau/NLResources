import { GetStaticProps } from 'next/types'
import Link from 'next/Link'
import prisma from '../lib/prisma'
import { Type, Resource, Organization } from '@prisma/client'

interface ResourceWithOrg extends Resource {
  organization: Pick<Organization, 'name'>
}

export interface ResourcesProps {
  resources: ResourceWithOrg[]
}

export const getStaticProps: GetStaticProps<ResourcesProps> = async () => {
  const resources: ResourceWithOrg[] = await prisma.resource.findMany({
    where: { reviewed: true, type: Type.MENTORSHIP },
    include: {
      organization: {
        select: { name: true },
      },
    },
  })
  return {
    props: { resources },
    revalidate: 10,
  }
}

export function Index(props: ResourcesProps) {
  return (
    <>
    <div>
      <h1 className="bg-blue-500 p-2 font-mono">
        Mentorship main page 👋
      </h1>
      <ul className="text-green-500">
        {props.resources.map((resource) => {
          return <li key={resource.id} onClick={() => console.log(resource)}>{resource.title}</li>
        })}
      </ul>
      <Link legacyBehavior href="/submit">
        <button>
          <a>Add a resource</a>
        </button>
      </Link>
    </div>
    </>
  )
}

export default Index
