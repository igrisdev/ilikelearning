import { useConfigStore } from '@stores/configStore'

import { Dictionary } from '@components_functional/Dictionary'
import { ViewImages } from '@components_functional/ViewImages'
import { useEffect } from 'react'

export const ViewSelected = () => {
  const { view } = useConfigStore()

  const VIEWS = {
    DICTIONARY: <Dictionary />,
    IMAGES: <ViewImages />,
    SENTENCES: <div>Sentences</div>,
  }

  const Selected = () => {
    if (view) {
      return VIEWS[view]
    }

    return <div>Select a view</div>
  }

  useEffect(() => {
    Selected()
  }, [view])

  return (
    <div className='h-full'>
      <Selected />
    </div>
  )
}
