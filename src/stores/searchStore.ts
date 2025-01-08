import { create } from 'zustand'

type SearchStore = {
  word: string,
  searchWord: (word: string) => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  word: '',
  searchWord: (word: string) => set({ word }),
}))
