import React from 'react'
import { signOut } from 'next-auth/react'

type HeaderProps = {
  firstName: string
}

export const Header: React.FC<HeaderProps> = ({ firstName }) => {
  return (
    <nav>
      <div>
        <p>
          Welcome, {firstName}
        </p>
        <button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>
          <a>Log out</a>
        </button>
      </div>
    </nav>
  )
}

export default Header
