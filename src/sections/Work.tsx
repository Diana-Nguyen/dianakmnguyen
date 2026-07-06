import { Link } from 'react-router-dom'
import { caseStudies } from '../data/case-studies'
import { sortWorkCaseStudies } from '../data/experience-sort'
import { ROUTES } from '../data/routes'
import { site } from '../data/site'
import { stickers } from '../data/stickers-data'
import { workCaseStudies } from '../data/work-case-studies'
import { SectionShell } from '../components/SectionShell'
import { DisplayHeading } from '../components/DisplayHeading'
import { StickerField } from '../components/StickerField'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { WorkCaseStudyCard } from '../components/WorkCaseStudyCard'
import { useStickerLayout } from '../components/useStickerLayout'
import './sections.css'

const WORK_PREVIEW_COUNT = 2
const UX_PREVIEW_COUNT = 4

export function Work() {
  const uxHighlights = caseStudies
    .filter((study) => study.featuredOnHome !== false)
    .slice(0, UX_PREVIEW_COUNT)

  const workItems = sortWorkCaseStudies(workCaseStudies)
  const workHighlights = workItems.slice(0, WORK_PREVIEW_COUNT)

  const { mode: stickerMode } = useStickerLayout()

  return (
    <SectionShell id="work" variant="forest" labelledBy="work-heading">
      {stickerMode !== 'tidy' ? (
        <StickerField
          section="work"
          sectionId="work"
          stickers={stickers}
          layoutMode={stickerMode}
        />
      ) : null}
      <div className="section-inner">
        <header className="work__header">
          <DisplayHeading
            id="work-heading"
            before="the"
            emphasis="main quest"
          />
          <p className="mono-label">{site.mainQuestIntro}</p>
        </header>
        <div className="work__cases">
          <section
            className="work__cases-block"
            aria-labelledby="work-cases-work-heading"
          >
            <div className="work__cases-header">
              <h2 id="work-cases-work-heading" className="work__cases-heading">
                Product & Engineering
              </h2>
              <p className="work__cases-link mono-label">
                <Link to={ROUTES.workCaseStudies}>All work case studies →</Link>
              </p>
            </div>
            <div className="work__cases-grid">
              {workHighlights.map((study) => (
                <WorkCaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </section>

          <section
            className="work__cases-block"
            aria-labelledby="work-cases-ux-heading"
          >
            <div className="work__cases-header">
              <h2 id="work-cases-ux-heading" className="work__cases-heading">
                UX Research & Prototyping
              </h2>
              <p className="work__cases-link mono-label">
                <Link to={ROUTES.research}>All research case studies →</Link>
              </p>
            </div>
            <div className="work__cases-grid">
              {uxHighlights.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </SectionShell>
  )
}
