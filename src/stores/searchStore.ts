import { create } from 'zustand'

type SearchStore = {
  word: string,
  dictionaryUrl: string,
  imagesUrl: string,
  searchWord: (word: string) => void
}

// %22${word}%22
export const useSearchStore = create<SearchStore>()((set) => ({
  word: '',
  dictionaryUrl: 'https://www.wordreference.com/es/translation.asp?tranword=',
  imagesUrl: 'https://www.google.com/search?tbm=isch&amp;safe=active&amp;q=',
  searchWord: (word: string) => set({ word }),
}))
