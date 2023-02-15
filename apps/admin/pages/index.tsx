import { useSession, getSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import { useState, useEffect } from 'react'
import { Header } from "./../Header"
import prisma from '../lib/prisma'
import { Resource, Organization } from '@prisma/client'

interface ResourceWithOrg extends Resource {
  organization: Pick<Organization, 'name'>
}

export interface ResourcesProps {
  resources: ResourceWithOrg[]
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { resources: [] } }
  }

  const resources: ResourceWithOrg[] = await prisma.resource.findMany({
    include: {
      organization: {
        select: { name: true },
      },
    },
    orderBy: [
      {
        reviewed: 'asc',
      },
      {
        updatedAt: 'desc',
      },
    ],
  })
  return {
    props: {
      resources: resources.map((resource: ResourceWithOrg) => ({
        ...resource,
        updatedAt: resource.updatedAt.toISOString(),
      })),
    }
  }
}

export function Index(props: ResourcesProps) {
  const { data: session, status } = useSession()
  if (status === 'unauthenticated' || (status !== 'loading' && !session)) {
    Router.push('/auth/signin')
  }

  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const reviewResource = async (id: string, reviewed: boolean) => {
    if (!isRefreshing) {
      const res = await fetch(`/api/review/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewed
        })
      })
      if (res.status < 300) {
        refreshData()
      }
    }
  }

  const deleteResource = async (id: string) => {
    if (!isRefreshing) {
      const res = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
      })
      if (res.status < 300) {
        refreshData()
      }
    }
  }

  useEffect(() => {
    setIsRefreshing(false)
  }, [props])

  return (
    <>
      {session &&
        <div>
          <Header firstName={session?.user.name.split(' ')[0]}></Header>
          <h1 className="bg-green-500 p-2 font-mono">
            Admin main page 👋
          </h1>
          <ul className="text-green-500">
            {props.resources.map((resource) => {
              return (
                <li
                  key={resource.id}
                  onClick={() => console.log(resource)}
                >
                  <span>{`${resource.title} - ${resource.organization.name} - ${resource.type} - Reviewed: ${resource.reviewed} - `}</span>
                  {!!session && (
                    <>
                      <button onClick={() => reviewResource(resource.id, !resource.reviewed)}>{resource.reviewed ? 'Unpublish' : 'Publish'}</button>{' - '}
                      <button onClick={() => deleteResource(resource.id)}>Delete</button>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      }
    </>
  )
}

export default Index
