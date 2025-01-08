import { create } from 'zustand'

type SearchStore = {
  word: string,
  apiUrl: string,
  searchWord: (word: string) => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  word: '',
  apiUrl: 'https://www.wordreference.com/es/translation.asp?tranword=',
  searchWord: (word: string) => set({ word }),
}))
