import { Navigate, useParams } from 'react-router-dom'
import { ContentPageNotFound } from '../components/content-page/ContentPage'
import { findCaseStudy } from '../data/case-studies'
import { BACK_TO_RESEARCH, ROUTES } from '../data/routes'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = slug ? findCaseStudy(slug) : undefined

  if (!study) {
    return (
      <ContentPageNotFound
        message="Case study not found."
        {...BACK_TO_RESEARCH}
      />
    )
  }

  return <Navigate to={`${ROUTES.research}#${study.slug}`} replace />
}
