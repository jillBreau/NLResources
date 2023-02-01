import Link from 'next/link'

export function Unauthorized() {
  return (
    <div className="flex flex-col items-center p-12 font-mono gap-y-4">
      <h1>
        You are not authorized.
      </h1>
      <p>
        Only existing administrators can access our admin site.
      </p>
      <Link href='/auth/signin' className="bg-green-300 p-1 px-2 rounded">Return to login</Link>
    </div>
  );
}

export default Unauthorized
