import { create } from 'zustand'

type Languages = {
  [key: string]: Word[]
}

type Word = {
  word: string
  translation: string
  level: number
  category: string
  image: string
}

type LanguagesStore = {
  languages: Languages
  addWord: (word: Word, language: string) => void
}

export const useLanguagesStore = create<LanguagesStore>()(set => ({
  languages: {},
  addWord: (word: Word, language: string) =>
    set(({ languages }) => ({
      languages: {
        ...languages,
        [language]: [...(languages[language] || []), word],
      },
    })),
}))
