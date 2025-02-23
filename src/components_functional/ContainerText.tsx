import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

// const sentences = [
//   ['Hello', 'World', 'This', 'is', 'a', 'test', 'text'],
//   ['to', 'see', 'if', 'the', 'click', 'event', 'works'],
//   ['Hello', 'World', 'This', 'is', 'a', 'test', 'text'],
// ]

export const ContainerText = () => {
  const { words, searchWord } = useSearchStore()
  const { view, setView } = useConfigStore()
  const { languages } = useLanguagesStore()
  const [selectedWord, setSelectedWord] = useState('')

  const handleClick = () => {
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) return

    const range = selection.getRangeAt(0)
    const node = range.startContainer
    const offset = range.startOffset

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      if (!text) return

      let before = text.slice(0, offset).split(/\s+/)
      let after = text.slice(offset).split(/\s+/)

      let words = (before.pop() || '') + (after.shift() || '')
      words = words.replace(/[^\wáéíóúüñÁÉÍÓÚÜÑ'-]/g, '')

      if (words) {
        searchWord(words)
      }

      if (view !== 'DICTIONARY') setView('DICTIONARY')
    }
  }

  return (
    <div className='bg-base-300 p-2 rounded-sm [&>p]:flex [&>p]:flex-wrap [&>p]:gap-x-1 flex flex-col gap-y-2 [&>p>span]:cursor-pointer'>
      <p onClick={handleClick} className='cursor-pointer text-lg'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore magnam
        quis, voluptatibus consequatur odio maiores cum molestias sint
        repudiandae, eaque commodi similique numquam exercitationem quo
        recusandae pariatur mollitia temporibus fuga. I'm.
      </p>
    </div>
  )
}
