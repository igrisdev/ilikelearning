import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

export const Dictionary = () => {
  const { words, dictionaryUrl } = useSearchStore()
  const [text, setText] = useState('')

  const translateText = async (text: string) => {
    const url = dictionaryUrl(text)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.responseData) {
        console.log('Texto traducido:', data.responseData.translatedText)
        setText(data.responseData.translatedText)
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

  // const text = 'casa'
  // fetch(
  //   `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(
  //     text
  //   )}`
  // )
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Texto traducido:', data[0][0][0])
  //   })
  //   .catch(error => console.error('Error al traducir:', error))

  return (
    <div className='w-full h-full'>
      {/* <iframe
        src={`${dictionaryUrl}${words}`}
        className='w-full h-full'
      ></iframe> */}

      <p>{text}</p>
    </div>
  )
}
