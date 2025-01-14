import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'

export const ContainerText = () => {
  const { searchWord } = useSearchStore()
  const { view, setView } = useConfigStore()
  const { languages } = useLanguagesStore()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLSpanElement
    if (target.tagName === 'SPAN') {
      if (target.textContent) searchWord(target.textContent)

      if (view !== 'DICTIONARY') setView('DICTIONARY')
    }

    console.log(languages)
  }

  return (
    <div
      onClick={handleClick}
      className='bg-base-300 p-2 rounded-sm [&>p]:flex [&>p]:flex-wrap [&>p]:gap-x-1 flex flex-col gap-y-2 [&>p>span]:cursor-pointer'
    >
      <p>
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

      <p>
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
