import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'

export interface iBook {
  title: string
  description: string
  language: string
  tags: string[]
  // file: File | null
}

export const FormCreateBook = () => {
  const [books, setBooks] = useState<iBook[]>([])

  useEffect(() => {
    setBooks(initialBookStore())
  }, [])

  function initialBookStore(): iBook[] {
    const isBooks = JSON.parse(localStorage.getItem('books') as string) as {
      listBooks: iBook[]
    }

    if (isBooks) {
      return isBooks.listBooks
    }

    localStorage.setItem('books', JSON.stringify({ listBooks: [] }))
    return []
  }

  const createBook = (book: iBook) => {
    if (!books) return

    const newBooks: iBook[] | [] = [...books, book]

    localStorage.setItem('books', JSON.stringify({ listBooks: newBooks }))
    setBooks(newBooks)
  }

  const validateBook = (book: any) => {
    if (!book.title) {
      return 'El título es obligatorio'
    }

    if (!book.description) {
      return 'La descripción es obligatoria'
    }

    if (!book.language) {
      return 'El idioma es obligatorio'
    }

    if (!book.tags.length) {
      return 'Las etiquetas son obligatorias'
    }

    return null
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    validateBook(formData)

    const book = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      language: formData.get('language') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      // file: formData.get('fileUpload'),
    }

    createBook(book)

    window.location.href = '/'
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h2 className='text-xl font-semibold mb-4'>Nuevo Libro</h2>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Título
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Descripción
          </label>
          <textarea
            name='description'
            id='description'
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='language'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Idioma
          </label>
          <select
            name='language'
            id='language'
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none'
          >
            <option value='English'>English</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block mb-2 text-sm font-medium text-gray-300'
          >
            Tags
          </label>
          <input
            type='text'
            id='tags'
            name='tags'
            placeholder='Separa los tags con comas'
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          />
        </div>

        <div className='mt-2'>
          <button
            type='submit'
            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
          >
            Crear Libro
          </button>
        </div>
      </form>
    </div>
  )
}
