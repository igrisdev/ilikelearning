import { useConfigStore } from '@stores/configStore'
import { useSearchStore } from '@stores/searchStore'

export const AddWord = () => {
  const { word } = useSearchStore()

  const { setView } = useConfigStore()

  return (
    <div>
      <h2 className='text-2xl font-semibold'>
        {word ? word : 'Click on the word'}
        <button
          onClick={() => setView('IMAGES')}
          className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          View Images
        </button>
      </h2>
      <form action=''></form>
    </div>
  )
}
