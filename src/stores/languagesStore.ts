import { create } from 'zustand'

export interface iWord {
  words: string
  translation: string
  level: number
  group: string
}

interface iLanguage {
  name: string
  words: iWord[]
}

type iLanguagesStore = {
  languages: iLanguage[] | []
  addWordInLanguage: (word: iWord, language: string) => void
}

export const useLanguagesStore = create<iLanguagesStore>()(set => ({
  languages: [],

  addWordInLanguage: (word: iWord, language: string) => {
    set(({ languages }) => {
      const updatedLanguages = [...languages]

      const languageIndex = updatedLanguages.findIndex(
        lang => lang.name === language
      )

      if (languageIndex !== -1) {
        updatedLanguages[languageIndex] = {
          ...updatedLanguages[languageIndex],
          words: [...updatedLanguages[languageIndex].words, word],
        }
      } else {
        updatedLanguages.push({
          name: language,
          words: [word],
        })
      }

      return { languages: updatedLanguages }
    })
  },
}))
