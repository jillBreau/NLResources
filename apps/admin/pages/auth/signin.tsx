import { getProviders, signIn, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from "next-auth/providers"

export interface ProviderProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

export const getServerSideProps: GetServerSideProps<ProviderProps> = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export function SignIn(props: ProviderProps) {
  return (
    <>
      {Object.values(props.providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default SignIn
