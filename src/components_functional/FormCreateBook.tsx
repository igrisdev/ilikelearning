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
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <div>
        <label htmlFor='title'>Título</label>
        <input
          type='text'
          name='title'
          id='title'
          className='border p-2 rounded w-full'
        />
      </div>

      <div>
        <label htmlFor='description'>Descripción</label>
        <textarea
          name='description'
          id='description'
          className='border p-2 rounded w-full'
        ></textarea>
      </div>

      <div>
        <label htmlFor='language'>Idioma</label>
        <select name='language' id='language' className='border p-2 rounded'>
          <option value=' '>Seleccionar</option>
          <option value='English'>English</option>
        </select>
      </div>

      <div>
        <label htmlFor='tags'>Tags</label>
        <input
          type='text'
          name='tags'
          id='tags'
          className='border p-2 rounded w-full'
        />
      </div>

      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        Crear Libro
      </button>
    </form>
  )
}
