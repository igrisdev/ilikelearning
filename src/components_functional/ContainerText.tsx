import { useConfigStore } from '@stores/configStore'
import { useLanguagesStore } from '@stores/languagesStore'
import { useSearchStore } from '@stores/searchStore'

const sentences = [
  ['Hello', 'World', 'This', 'is', 'a', 'test', 'text'],
  ['to', 'see', 'if', 'the', 'click', 'event', 'works'],
  ['Hello', 'World', 'This', 'is', 'a', 'test', 'text'],
]

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
  }

  return (
    <div
      onClick={handleClick}
      className='bg-base-300 p-2 rounded-sm [&>p]:flex [&>p]:flex-wrap [&>p]:gap-x-1 flex flex-col gap-y-2 [&>p>span]:cursor-pointer'
    >
      {sentences.map((sentence, index) => (
        <p key={index}>
          {sentence.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </p>
      ))}
    </div>
  )
}
