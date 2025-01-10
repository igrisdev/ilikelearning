import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

export const ViewImages = () => {
  const [images, setImages] = useState([])
  const { word, imagesUrl } = useSearchStore()

  const fetchImages = async (word: string) => {
    const response = await fetch(imagesUrl + word, {
      method: 'GET',
      headers: {
        Authorization:
          'Vaev3LDKdJcGrqqEqC73CVPaWA08yoQqNgR4D3lXyfGKC4n5qWZRoF4E',
      },
    })
    const data = await response.json()
    setImages(data.photos)
  }

  useEffect(() => {
    if (!word) return

    fetchImages(word)
  }, [word])

  return (
    <div className='flex flex-wrap gap-2'>
      {images.map(({ src }: { src: { small: string } }) => (
        <article>
          <img src={src.small} />
        </article>
      ))}
    </div>
  )
}
