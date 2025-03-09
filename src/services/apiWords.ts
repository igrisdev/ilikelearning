interface iAPI {
  getWord: (key: string) => any
  setWord: (key: string, value: any) => void
}

export const API_WORDS: iAPI = {
  getWord: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '{}')
  },
  setWord: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
}
