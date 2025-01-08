import { create } from 'zustand'

type SearchStore = {
  word: string,
  dictionaryUrl: string,
  searchWord: (word: string) => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  word: '',
  dictionaryUrl: 'https://www.wordreference.com/es/translation.asp?tranword=',
  searchWord: (word: string) => set({ word }),
}))
