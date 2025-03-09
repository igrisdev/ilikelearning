import { useSearchStore } from '@stores/searchStore'

export const useTranslateText = () => {
  const { dictionaryUrl, setTextTranslated } = useSearchStore()

  const translate = async (text: string) => {
    const url = dictionaryUrl(text)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        const translatedText = data[0][0][0]
        setTextTranslated(translatedText)
        return translatedText
      } else {
        throw new Error('No se pudo traducir el texto')
      }
    } catch (error) {
      throw new Error('Error al conectar con el servidor')
    }
  }

  return { translate }
}
