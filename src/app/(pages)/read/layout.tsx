export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-screen container mx-auto flex flex-col'>
      <header className='h-20 flex items-center'>
        <h1 className='text-2xl font-semibold'>I ❤ Learning</h1>
      </header>
      {children}
    </main>
  )
}
