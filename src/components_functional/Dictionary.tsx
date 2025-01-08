import { useSearchStore } from '@stores/searchStore'

export const Dictionary = () => {
  const { word, dictionaryUrl } = useSearchStore()

  return (
    <div className='w-full h-full'>
      <iframe
        src={`${dictionaryUrl}${word}`}
        className='w-full h-full'
      ></iframe>
    </div>
  )
}
