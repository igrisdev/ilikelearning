import type { iBook } from './FormCreateBook'

import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'
import { useEffect, useState } from 'react'

function templateBox(words: string, translation: string, color: string) {
  return `<span class='relative group border-b-2 ${color} mr-1'>
              ${words} 
              <article class='z-50 absolute left-0 top-7 overflow-hidden group-hover:inline-block hidden bg-base-200'>
                <p class='text-md text-center font-semibold px-6 py-1 w-max truncate'>${translation}</p>

                <div class='max-w-42 w-auto max-h-24 h-full'>
                  <img
                    src='https://images.pexels.com/photos/10387614/pexels-photo-10387614.jpeg?auto=compress&cs=tinysrgb&h=130'
                    class='w-full h-full object-cover'
                    loading='eager'
                    alt='IMG palabra'
                  />
                </div>
              </article>
            </span>`
}

function normaliceWord(word: string) {
  return word.toLocaleLowerCase().replace(/[^\wáéíóúüñÁÉÍÓÚÜÑ'-]/g, '')
}

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

  const levelWords = (level: number, words: string, translation: string) => {
    if (level === 1) {
      return templateBox(words, translation, 'border-red-600')
    } else if (level === 2) {
      return templateBox(words, translation, 'border-red-300')
    } else if (level === 3) {
      return templateBox(words, translation, 'border-yellow-300')
    } else if (level === 4) {
      return templateBox(words, translation, 'border-green-300')
    } else if (level === 5) {
      return templateBox(words, translation, 'border-green-600')
    } else {
      return words
    }
  }

  useEffect(() => {
    const listWords = languages.find(lang => lang.name === language)?.words
    const textSplit = books[0]?.description.split(' ')

    const newText = textSplit?.map(word => {
      const findWord = listWords?.find(
        lang => lang.words.toLocaleLowerCase() === normaliceWord(word)
      )

      console.log(findWord)

      if (findWord) {
        return levelWords(findWord.level, word, findWord.translation)
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
        {/* <span className='border-b-2 border-red-600 relative group'>
          hello
          <article className='absolute overflow-hidden group-hover:block hidden bg-base-200'>
            <p className='text-md text-center font-semibold px-6 py-1'>hola</p>

            <div className='max-w-32 w-auto max-h-24 h-full'>
              <img
                src='https://images.pexels.com/photos/10387614/pexels-photo-10387614.jpeg?auto=compress&cs=tinysrgb&h=130'
                className='w-full h-full object-cover'
                loading='eager'
                alt='IMG palabra'
              />
            </div>
          </article>
        </span> */}
      </div>
    </>
  )
}
