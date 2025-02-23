import { create } from 'zustand'

type SearchStore = {
  words: string
  dictionaryUrl: string
  imagesUrl: string
  searchWord: (words: string) => void
}

export const useSearchStore = create<SearchStore>()(set => ({
  words: '',
  dictionaryUrl:
    'https://www.deepl.com/es/translator/q/es/diccionario/en/dictionary/1002a452e',
  imagesUrl: 'https://api.pexels.com/v1/search?query=',
  searchWord: (words: string) => set({ words }),
}))
