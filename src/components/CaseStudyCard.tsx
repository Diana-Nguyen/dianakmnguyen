import { Link } from 'react-router-dom'
import type { CaseStudy } from '../data/types'
import { ROUTES } from '../data/routes'
import { assetUrl } from '../utils/assetUrl'
import './CaseStudyCard.css'

interface CaseStudyCardProps {
  study: CaseStudy
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="case-card kraft-frame case-card--home">
      {study.previewImage ? (
        <div className="case-card__preview">
          <img
            src={assetUrl(study.previewImage)}
            alt={study.previewAlt ?? ''}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <h3 className="case-card__title">{study.title}</h3>
      <ul className="case-card__tags" aria-label="Methods">
        {study.methods.map((method) => (
          <li key={method}>{method}</li>
        ))}
      </ul>
      <p className="case-card__summary">{study.summary}</p>
      <Link to={`${ROUTES.research}#${study.slug}`} className="case-card__cta">
        Read case study
      </Link>
    </article>
  )
}
