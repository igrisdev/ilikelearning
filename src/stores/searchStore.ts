import { create } from 'zustand'

type SearchStore = {
  words: string
  textTranslated: string
  imagesUrl: string
  setTextTranslated: (text: string) => void
  searchWord: (words: string) => void
  dictionaryUrl: (words: string) => string
}

export const useSearchStore = create<SearchStore>()(set => ({
  words: '',
  textTranslated: '',
  imagesUrl: 'https://api.pexels.com/v1/search?query=',
  setTextTranslated: (text: string) => set({ textTranslated: text }),
  searchWord: (words: string) => set({ words }),
  dictionaryUrl: words => {
    let text = encodeURIComponent(words)
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|es-CO`

    return url
  },
}))
