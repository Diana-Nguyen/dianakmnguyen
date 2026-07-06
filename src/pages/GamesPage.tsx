import {
  ContentPage,
  ContentPageHeader,
  ContentPageProjectCard,
} from '../components/content-page/ContentPage'
import { getProjectBySlug } from '../data/projects'
import { BACK_TO_MAIN_QUEST } from '../data/routes'

export function GamesPage() {
  const project = getProjectBySlug('game-development')

  return (
    <ContentPage variant="deep" width="medium">
      <ContentPageHeader
        {...BACK_TO_MAIN_QUEST}
        title="Wynmere Studios"
        subtitle="(game projects · hobby)"
      />

      {project ? (
        <ContentPageProjectCard
          id={project.id}
          title={project.title}
          role={project.role}
          description={project.description}
          highlights={project.highlights}
        />
      ) : null}
    </ContentPage>
  )
}
