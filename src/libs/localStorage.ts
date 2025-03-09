interface iLocalStorage {
  getItem: (key: string) => any
  setItem: (key: string, value: any) => void
}

export const localStorage: iLocalStorage = {
  getItem: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '{}')
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
}
