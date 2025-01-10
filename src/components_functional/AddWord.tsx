import { useConfigStore } from '@stores/configStore'
import { useSearchStore } from '@stores/searchStore'

export const AddWord = () => {
  const { word } = useSearchStore()

  const { view, setView } = useConfigStore()

  const handleView = () => {
    if (view !== 'IMAGES') setView('IMAGES')
  }

  return (
    <div>
      <h2 className='flex justify-between items-center text-2xl font-semibold'>
        {word ? word : 'Click on the word'}
        <button onClick={handleView} className='btn btn-primary'>
          View Images
        </button>
      </h2>
      <form action=''></form>
    </div>
  )
}
