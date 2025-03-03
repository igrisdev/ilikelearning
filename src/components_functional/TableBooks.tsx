import { useEffect, useState } from 'react'
import type { iBook } from './FormCreateBook'

export const TableBooks = () => {
  const [books, setBooks] = useState<iBook[]>([])

  useEffect(() => {
    const isBooks = JSON.parse(localStorage.getItem('books') as string) as {
      listBooks: iBook[]
    }

    if (isBooks) {
      return setBooks(isBooks.listBooks)
    }
  }, [])

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra'>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Lenguaje</th>
            <th>Tags</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.title}>
              <td>
                <a href={`/read/${book.title}`}>{book.title}</a>
              </td>
              <td>{book.language}</td>
              <td>{book.tags.join(', ')}</td>
              <td>{/* <a href={`/book/${book.id}`}>Leer</a> */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
