import { create } from 'zustand'

type SearchStore = {
  word: string
  dictionaryUrl: string
  imagesUrl: string
  searchWord: (word: string) => void
}

export const useSearchStore = create<SearchStore>()(set => ({
  word: '',
  dictionaryUrl:
    'https://www.deepl.com/es/translator/q/es/diccionario/en/dictionary/1002a452e',
  imagesUrl: 'https://api.pexels.com/v1/search?query=',
  searchWord: (word: string) => set({ word }),
}))
