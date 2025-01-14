import { create } from "zustand";


type View = 'DICTIONARY' | 'IMAGES' | 'SENTENCES'

type ConfigStore = {
  view: View,
  language: string,
  setView: (view: string) => void
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  view: 'DICTIONARY',
  language: 'english',
  setView: (view: string) => set({ view: view as View }),
}))