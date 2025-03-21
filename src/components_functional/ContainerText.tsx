import type { iBook } from './FormCreateBook'

import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

export const ContainerText = ({ title }: { title: string }) => {
  const { words, searchWord } = useSearchStore()
  const { view, setView, language } = useConfigStore()
  const { languages } = useLanguagesStore()

  const [selectedWord, setSelectedWord] = useState('')
  const [books, setBooks] = useState<iBook[]>([])
  const [newDescription, setNewDescription] = useState('')

  const handleClick = () => {
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) return

    const isSelected = selection.toString().split(' ').length > 1

    if (isSelected) {
      searchWord(selection.toString())
      if (view !== 'NULL') setView('NULL')
      return
    }

    const range = selection.getRangeAt(0)
    const node = range.startContainer
    const offset = range.startOffset

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      if (!text) return

      let before = text.slice(0, offset).split(/\s+/)
      let after = text.slice(offset).split(/\s+/)

      let words = (before.pop() || '') + (after.shift() || '')
      words = normaliceWord(words)

      if (words) {
        searchWord(words)
      }

      if (view !== 'NULL') setView('NULL')
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

  const levelWords = (level: number, words: string) => {
    if (level === 1) {
      return `<span class='border-b-2 border-red-600'>${words}</span>`
    } else if (level === 2) {
      return `<span class='border-b-2 border-red-300'>${words}</span>`
    } else if (level === 3) {
      return `<span class='border-b-2 border-yellow-300'>${words}</span>`
    } else if (level === 4) {
      return `<span class='border-b-2 border-green-300'>${words}</span>`
    } else if (level === 5) {
      return `<span class='border-b-2 border-green-600'>${words}</span>`
    } else {
      return words
    }
  }

  function normaliceWord(word: string) {
    return word.toLocaleLowerCase().replace(/[^\wáéíóúüñÁÉÍÓÚÜÑ'-]/g, '')
  }

  useEffect(() => {
    const listWords = languages.find(lang => lang.name === language)?.words
    const textSplit = books[0]?.description.split(' ')

    const newText = textSplit?.map(word => {
      const findWord = listWords?.find(
        lang => lang.words.toLocaleLowerCase() === normaliceWord(word)
      )

      if (findWord) {
        return levelWords(findWord.level, word)
      }

      return word
    })

    if (!newText) return setNewDescription(books[0]?.description)

    setNewDescription(newText?.join(' '))
  }, [books, languages])

  return (
    <>
      {/* <div className='bg-base-300 p-2 rounded-sm [&>p]:flex [&>p]:flex-wrap [&>p]:gap-x-1 flex flex-col gap-y-2 [&>p>span]:cursor-pointer'>
        <p
          onClick={handleClick}
          className='cursor-pointer text-lg '
          dangerouslySetInnerHTML={{ __html: newDescription }}
        />
      </div> */}
      <div className='bg-base-300 p-2 rounded-sm flex flex-col gap-y-2'>
        <p
          onClick={handleClick}
          className='cursor-pointer text-lg'
          dangerouslySetInnerHTML={{ __html: newDescription }}
        />
      </div>
    </>
  )
}
