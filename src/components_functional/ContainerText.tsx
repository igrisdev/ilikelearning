import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'
import type { iBook } from './FormCreateBook'

export const ContainerText = ({ title }: { title: string }) => {
  const { words, searchWord } = useSearchStore()
  const { view, setView } = useConfigStore()
  const { languages } = useLanguagesStore()
  const [selectedWord, setSelectedWord] = useState('')
  const [books, setBooks] = useState<iBook[]>([])

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

      if (view !== 'IMAGES') setView('NULL')
    }
  }

  useEffect(() => {
    const isBooks = JSON.parse(localStorage.getItem('books') as string) as {
      listBooks: iBook[]
    }

    if (isBooks) {
      const findBook = isBooks.listBooks.find(book => book.title === title)

      if (!findBook) return
      setBooks([findBook])
    }
  }, [])

  return (
    <div className='bg-base-300 p-2 rounded-sm [&>p]:flex [&>p]:flex-wrap [&>p]:gap-x-1 flex flex-col gap-y-2 [&>p>span]:cursor-pointer'>
      <p onClick={handleClick} className='cursor-pointer text-lg'>
        {books[0]?.description}
      </p>
    </div>
  )
}
