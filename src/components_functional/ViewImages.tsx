import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

export const ViewImages = () => {
  const [images, setImages] = useState([])
  const { words, imagesUrl } = useSearchStore()

  const fetchImages = async (words: string) => {
    const response = await fetch(imagesUrl + words, {
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
    if (!words) return

    fetchImages(words)
  }, [words])

  return (
    <div className='flex flex-wrap gap-2 overflow-y-auto h-3/4'>
      {images.map(({ src }: { src: { small: string } }) => (
        <article key={src.small}>
          <img src={src.small} />
        </article>
      ))}
    </div>
  )
}
