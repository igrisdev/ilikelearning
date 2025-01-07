import Link from 'next/link'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='container mx-auto flex h-screen flex-col'>
      <header className='flex h-20 items-center'>
        <Link href={'/'} className='text-2xl font-semibold'>
          I ❤ Learning
        </Link>
      </header>
      {children}
    </main>
  )
}
