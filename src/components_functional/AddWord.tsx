import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

export const AddWord = () => {
  const { words, textTranslated, dictionaryUrl, setTextTranslated } =
    useSearchStore()
  const { view, setView, language } = useConfigStore()
  const { addWord } = useLanguagesStore()

  const handleView = () => {
    if (view !== 'IMAGES') setView('IMAGES')
  }

  const translateText = async (text: string) => {
    const url = dictionaryUrl(text)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.responseData) {
        console.log('Texto traducido:', data.responseData.translatedText)
        setTextTranslated(data.responseData.translatedText)
        return
      } else {
        throw new Error('No se pudo traducir el texto')
      }
    } catch (error) {
      throw new Error('Error al conectar con el servidor')
    }
  }

  useEffect(() => {
    translateText(words || 'Bienvenido a I like learning')
  }, [words])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const words = {
      words: formData.get('words') as string,
      translation: formData.get('translation') as string,
      level: Number(formData.get('level')) as number,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
    }

    addWord(words, language)

    event.currentTarget.reset()
  }

  return (
    <div>
      <h2 className='flex justify-between items-center text-2xl font-semibold'>
        {words ? words : 'Click on the words'}
        <button onClick={handleView} className='btn btn-primary'>
          View Images
        </button>
      </h2>
      <form onSubmit={handleSubmit}>
        <input type='hidden' name='words' value={words} />
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
            defaultValue={textTranslated || ''}
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
