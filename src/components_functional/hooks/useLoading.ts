import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const handleLoading = () => {
    setLoading(true)
  }

  const handleFinishLoading = () => {
    setLoading(false)
  }

  return { loading, handleLoading, handleFinishLoading }
}
