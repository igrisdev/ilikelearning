import { useConfigStore } from '@stores/configStore'

import { ViewImages } from '@components_functional/ViewImages'
import { useEffect } from 'react'

const VIEWS = {
  IMAGES: <ViewImages />,
  NULL: <div></div>,
}

export const ViewSelected = () => {
  const { view } = useConfigStore()

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
