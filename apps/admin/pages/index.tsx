import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { Header } from "./../Header"

export function Index() {
  const { data: session, status } = useSession()
  if (status === 'unauthenticated' || (status !== 'loading' && !session)) {
    Router.push('/auth/signin')
  }
  return (
    <>
      {session &&
        <>
          <div>
            <h1 className="bg-green-500 p-2 font-mono">
              Admin main page 👋
            </h1>
          </div>
          <Header firstName={session?.user.name.split(' ')[0]}></Header>
        </>
      }
    </>
  );
}

export default Index
