import { ReadText } from '@/sections/ReadText'

export default function page() {
  return (
    <section className='grid h-full grid-cols-2 gap-6'>
      <ReadText />
      <div className=''>Dictionary</div>
    </section>
  )
}
