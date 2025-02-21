import { useSearchStore } from '@stores/searchStore'

export const Dictionary = () => {
  const { word, dictionaryUrl } = useSearchStore()

  const text = 'casa'
  fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(
      text
    )}`
  )
    .then(response => response.json())
    .then(data => {
      console.log('Texto traducido:', data[0][0][0])
    })
    .catch(error => console.error('Error al traducir:', error))

  return (
    <div className='w-full h-full'>
      {/* <iframe
        src={`${dictionaryUrl}${word}`}
        className='w-full h-full'
      ></iframe> */}
      hola
    </div>
  )
}
