import { Link } from 'react-router-dom'
import type { WorkCaseStudy } from '../data/types'
import { ROUTES } from '../data/routes'
import './WorkCaseStudyCard.css'

interface WorkCaseStudyCardProps {
  study: WorkCaseStudy
}

export function WorkCaseStudyCard({ study }: WorkCaseStudyCardProps) {
  return (
    <article className="work-case-card kraft-frame">
      <h3 className="work-case-card__title">{study.title}</h3>
      <p className="mono-label work-case-card__meta">{study.product}</p>
      <ul className="work-case-card__tags" aria-label="Topics">
        {study.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className="work-case-card__summary">{study.oneLiner}</p>
      <Link to={ROUTES.workCaseStudy(study.slug)} className="work-case-card__cta">
        Read case study
      </Link>
    </article>
  )
}
