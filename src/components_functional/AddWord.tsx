import { useSearchStore } from '@stores/searchStore'

export const AddWord = () => {
  const { word } = useSearchStore()

  return (
    <div>
      <h2 className='text-2xl font-semibold'>
        {word ? word : 'Click on the word'}
      </h2>
      <form action=''></form>
    </div>
  )
}
