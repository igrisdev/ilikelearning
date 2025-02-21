import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'

export const AddWord = () => {
  const { word } = useSearchStore()
  const { view, setView, language } = useConfigStore()
  const { addWord } = useLanguagesStore()

  const handleView = () => {
    if (view !== 'IMAGES') setView('IMAGES')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const word = {
      word: formData.get('word') as string,
      translation: formData.get('translation') as string,
      level: Number(formData.get('level')) as number,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
    }

    addWord(word, language)

    event.currentTarget.reset()
  }

  return (
    <div>
      <h2 className='flex justify-between items-center text-2xl font-semibold'>
        {word ? word : 'Click on the word'}
        <button onClick={handleView} className='btn btn-primary'>
          View Images
        </button>
      </h2>
      <form onSubmit={handleSubmit}>
        <input type='hidden' name='word' value={word} />
        <div>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            name='category'
            id='category'
            placeholder='Category'
          />
        </div>

        <div>
          <label htmlFor='level'>Level</label>

          <input type='radio' name='level' value='1' />
          <input type='radio' name='level' value='2' />
          <input type='radio' name='level' value='3' />
        </div>

        <div>
          <label htmlFor='translation'>Translation</label>
          <input
            type='text'
            name='translation'
            id='translation'
            placeholder='Translation'
          />
        </div>

        <div>
          <label htmlFor='image'>Image</label>
          {/* <img src='' alt='' /> */}
        </div>

        <button className='btn btn-primary'>Add Word</button>
      </form>
    </div>
  )
}
