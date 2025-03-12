import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useTranslateText } from './hooks/useTranslateText'

import { useEffect, useRef } from 'react'

export const AddWord = () => {
  const { words, textTranslated } = useSearchStore()
  const { view, setView, language } = useConfigStore()
  const { addWords, addWordInLanguage } = useLanguagesStore()
  const { translate } = useTranslateText()

  const handleView = () => {
    if (view !== 'IMAGES') setView('IMAGES')
  }

  useEffect(() => {
    translate(words || '')
  }, [words])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const words = {
      words: formData.get('words') as string,
      translation: formData.get('translation') as string,
      level: Number(formData.get('level')) as number,
      group: formData.get('group') as string,
      // image: formData.get('image') as string,
    }

    addWordInLanguage(words, language)
    event.currentTarget.reset()
  }

  useEffect(() => {
    const isLanguages = JSON.parse(localStorage.getItem('languages') || '[]')

    if (isLanguages.length > 0) {
      addWords(isLanguages)
    }
  }, [])

  return (
    <div>
      <h2 className='flex justify-between items-center text-2xl font-semibold'>
        <p className='text-3xl mb-2 font-bold text-white truncate'>
          {words ? words : 'Selecciona o Click en la/s palabra/s'}
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
            name='group'
            defaultValue={words || ''}
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
              <input type='radio' defaultChecked name='level' value='1' />
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
          <textarea
            name='translation'
            id='translation'
            defaultValue={textTranslated || ''}
            className='block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white resize-none [field-sizing:content] min-h-10 max-h-40'
          ></textarea>
        </div>

        <button className='btn btn-primary'>Crear Palabra</button>
      </form>
    </div>
  )
}
