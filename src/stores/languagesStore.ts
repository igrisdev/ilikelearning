import { create } from 'zustand'

export interface iWord {
  words: string
  translation: string
  level: number
  group: string
}

export interface iLanguage {
  name: string
  words: iWord[]
}

type iLanguagesStore = {
  languages: iLanguage[] | []
  addWords: (words: iLanguage[]) => void
  addWordInLanguage: (word: iWord, language: string) => void
}

export const useLanguagesStore = create<iLanguagesStore>()(set => ({
  languages: [],
  addWords: (words: iLanguage[]) => set({ languages: words }),
  addWordInLanguage: (word: iWord, language: string) => {
    set(({ languages }) => {
      const copyLanguages = [...languages]

      const targetLanguage = copyLanguages.find(lang => lang.name === language)

      if (targetLanguage) {
        targetLanguage.words.push(word)
      } else {
        copyLanguages.push({
          name: language,
          words: [word],
        })
      }

      localStorage.setItem('languages', JSON.stringify(copyLanguages))

      return { languages: copyLanguages }
    })
  },
}))
