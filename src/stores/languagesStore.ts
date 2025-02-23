import { create } from 'zustand'

type Languages = {
  [key: string]: Word[]
}

type Word = {
  words: string
  translation: string
  level: number
  category: string
  image: string
}

type LanguagesStore = {
  languages: Languages
  addWord: (words: Word, language: string) => void
}

export const useLanguagesStore = create<LanguagesStore>()(set => ({
  languages: {},
  addWord: (words: Word, language: string) =>
    set(({ languages }) => ({
      languages: {
        ...languages,
        [language]: [...(languages[language] || []), words],
      },
    })),
}))
