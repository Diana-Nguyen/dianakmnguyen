import { ContentPage, ContentPageHeader } from '../components/content-page/ContentPage'
import { PokemonCollection } from '../components/forinadex/PokemonCollection'
import './cards-page.css'

const GIST_ID = '2b873cc08ba9bbb6ff5d8f5c3b8b3c58'
const FORINADEX_URL = 'https://Diana-Nguyen.github.io/forinadex/'

export function CardsPage() {
  return (
    <ContentPage variant="deep" width="wide">
      <ContentPageHeader
        backTo="/"
        backLabel="← Back home"
        title="Pokémon card collection"
        intro={
          <>
            <p>
              Here&apos;s my current collection. It syncs from{' '}
              <a href={FORINADEX_URL} target="_blank" rel="noopener noreferrer">
                ForinaDex
              </a>
              , a tracker I built to browse sets and mark cards as owned or wishlisted.
            </p>
          </>
        }
      />
      <PokemonCollection gistId={GIST_ID} className="cards-gallery" />
      <p className="content-page__footer mono-label cards-page__disclaimer">
        I don&apos;t own the copyright to these card images. They are provided via the{' '}
        <a href="https://dev.pokemontcg.io/" target="_blank" rel="noopener noreferrer">
          Pokémon TCG API
        </a>{' '}
        and remain property of their respective rights holders.
      </p>
    </ContentPage>
  )
}
