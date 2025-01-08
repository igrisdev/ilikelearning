import { useSearchStore } from '@stores/searchStore'

export const Dictionary = () => {
  const { word, apiUrl } = useSearchStore()

  return (
    <div className='w-full h-full'>
      <iframe src={`${apiUrl}${word}`} className='w-full h-full'></iframe>
    </div>
  )
}
