import { GetStaticProps } from 'next/types';
import prisma from '../lib/prisma';
import { Type, Resource } from '@prisma/client'

export interface ResourcesProp {
  resources: Resource[]
}

export const getStaticProps: GetStaticProps<ResourcesProp> = async () => {
  const resources: Resource[] = await prisma.resource.findMany({
    where: { reviewed: true, type: Type.MENTORSHIP },
    include: {
      organization: {
        select: { name: true },
      },
    },
  });
  return {
    props: { resources },
    revalidate: 10,
  };
};

export function Index(props: ResourcesProp) {
  return (
    <div>
      <h1 className="bg-blue-500 p-2 font-mono">
        Mentorship main page 👋
      </h1>
      <ul className="text-green-500">
        {props.resources.map((resource) => {
          return <li key={resource.id} onClick={() => console.log(resource)}>{resource.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Index
