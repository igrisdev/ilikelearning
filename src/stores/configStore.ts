import { create } from 'zustand'

type View = 'IMAGES' | 'NULL'

type ConfigStore = {
  view: View
  language: string
  setView: (view: string) => void
}

export const useConfigStore = create<ConfigStore>()(set => ({
  view: 'IMAGES',
  language: 'english',
  setView: (view: string) => set({ view: view as View }),
}))
