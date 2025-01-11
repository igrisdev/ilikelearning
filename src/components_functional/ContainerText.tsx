import { useConfigStore } from '@stores/configStore'
import { useSearchStore } from '@stores/searchStore'

export const ContainerText = () => {
  const { searchWord } = useSearchStore()
  const { view, setView } = useConfigStore()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLSpanElement
    if (target.tagName === 'SPAN') {
      if (target.textContent) searchWord(target.textContent)

      if (view !== 'DICTIONARY') setView('DICTIONARY')
    }
  }

  return (
    <div onClick={handleClick} className='bg-base-300 p-2 rounded-sm'>
      <p className='flex flex-wrap gap-1'>
        <span>Hello</span>
        <span>World</span>
        <span>This</span>
        <span>is</span>
        <span>a</span>
        <span>test</span>
        <span>text</span>
        <span>to</span>
        <span>see</span>
        <span>if</span>
        <span>the</span>
        <span>click</span>
        <span>event</span>
        <span>works</span>
        <span>Hello</span>
        <span>World</span>
        <span>This</span>
        <span>is</span>
        <span>a</span>
        <span>test</span>
        <span>text</span>
        <span>to</span>
        <span>see</span>
        <span>if</span>
        <span>the</span>
        <span>click</span>
        <span>event</span>
        <span>works</span>
        <span>Hello</span>
        <span>World</span>
        <span>This</span>
        <span>is</span>
        <span>a</span>
        <span>test</span>
        <span>text</span>
        <span>to</span>
        <span>see</span>
        <span>if</span>
        <span>the</span>
        <span>click</span>
        <span>event</span>
        <span>works</span>
      </p>
    </div>
  )
}
