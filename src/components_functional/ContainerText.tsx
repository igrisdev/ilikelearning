import { useSearchStore } from '@stores/searchStore'

export const ContainerText = () => {
  const { searchWord } = useSearchStore()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLSpanElement
    if (target.tagName === 'SPAN') {
      console.log(target.textContent)

      if (target.textContent) searchWord(target.textContent)
    }
  }

  return (
    <div
      onClick={handleClick}
      className='flex flex-wrap gap-x-1 bg-base-300 p-2 rounded-sm'
    >
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
      <span>World!</span>
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
    </div>
  )
}
