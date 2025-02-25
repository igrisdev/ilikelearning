import { useState, type FormEvent, type ChangeEvent } from 'react'

export const FormCreateBook = () => {
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [pdfURL, setPdfURL] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const fileType = file.type

      if (fileType === 'text/plain') {
        // Leer archivos .txt
        const reader = new FileReader()
        reader.onload = event => {
          setFileContent(event.target?.result as string)
          setPdfURL(null) // Limpiar vista previa PDF
        }
        reader.readAsText(file)
      } else if (fileType === 'application/pdf') {
        // Mostrar PDF en un iframe
        const url = URL.createObjectURL(file)
        setPdfURL(url)
        setFileContent(null) // Limpiar texto previo
      } else {
        setFileContent(
          'No se puede mostrar el contenido de este tipo de archivo.'
        )
        setPdfURL(null)
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // console.log(
    //   'Datos del formulario:',
    //   formData.get('title'),
    //   formData.get('fileUpload')
    // )
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
        <label htmlFor='fileUpload'>Archivo (.txt, .pdf, .epub)</label>
        <input
          type='file'
          id='fileUpload'
          name='fileUpload'
          accept='.txt, .pdf, .epub'
          onChange={handleFileChange}
          className='border p-2 rounded w-full'
        />
      </div>

      {fileContent && (
        <div className='p-2 border rounded bg-gray-100'>
          <h3 className='font-bold'>Contenido del archivo:</h3>
          <pre className='whitespace-pre-wrap text-sm'>{fileContent}</pre>
        </div>
      )}

      {pdfURL && (
        <div className='mt-4'>
          <h3 className='font-bold mb-2'>Vista previa del PDF:</h3>
          <iframe
            src={pdfURL}
            width='100%'
            height='400px'
            className='border rounded'
          ></iframe>
        </div>
      )}

      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        Crear Libro
      </button>
    </form>
  )
}
