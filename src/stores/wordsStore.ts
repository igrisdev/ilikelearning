import { create } from 'zustand'

type WordsStore = {
  words: string[],
  addWord: (word: string) => void,
  removeWord: (word: string) => void,
}