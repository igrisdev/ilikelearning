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
        <p className='text-3xl mb-2 font-bold text-white'>
          {words ? words : 'Click on the words'}
        </p>
        <button onClick={handleView} className='btn btn-primary'>
          Buscar Imagen
        </button>
      </h2>

      <form onSubmit={handleSubmit} className='mb-3'>
        <input type='hidden' name='words' value={words} />

        <div className='mb-5'>
          <label
            htmlFor='group'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Grupo de palabra
          </label>
          <input
            type='text'
            id='group'
            className='border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white '
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='level'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Nivel de dificultad
          </label>

          <div className='flex gap-x-4 text-center [&>label>input]:size-4'>
            <label>
              <input type='radio' name='level' value='1' />
              <p>1</p>
            </label>
            <label>
              <input type='radio' name='level' value='2' />
              <p>2</p>
            </label>
            <label>
              <input type='radio' name='level' value='3' />
              <p>3</p>
            </label>
            <label>
              <input type='radio' name='level' value='4' />
              <p>4</p>
            </label>
            <label>
              <input type='radio' name='level' value='5' />
              <p>5</p>
            </label>
          </div>
        </div>

        <div className='mb-5'>
          <label
            htmlFor='translation'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Traducción
          </label>
          <input
            type='text'
            id='translation'
            defaultValue={textTranslated || ''}
            className='block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white '
          />
        </div>

        <button className='btn btn-primary'>Crear Palabra</button>
      </form>
    </div>
  )
}
