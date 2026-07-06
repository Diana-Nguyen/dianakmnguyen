import { Link } from 'react-router-dom'
import { ExperienceEntry } from '../components/ExperienceEntry'
import { ContentPage, ContentPageHeader } from '../components/content-page/ContentPage'
import { experienceSections } from '../data/experience'
import { BACK_TO_MAIN_QUEST, ROUTES } from '../data/routes'
import '../styles/experience-page.css'

export function ExperiencePage() {
  return (
    <ContentPage width="medium">
      <ContentPageHeader
        {...BACK_TO_MAIN_QUEST}
        title="Experience"
        intro={
          <>
            <p>
              Design engineer with 5+ years working on HBO Max and Discovery+ web applications at Warner Bros. Discovery, with a focus on commerce, design systems, and accessibility. I'm drawn to the technical craft, but equally to the people side: mentoring and treating inclusion as a starting point rather than an afterthought. Currently an M.S. candidate in Human-Computer Interaction at DePaul; B.S. in Computer Science; Certified Accessible Player Experience Practitioner.
            </p>
            <p className="mono-label">
              Expand any timeline entry or use Sys.nav to jump
              between sections or individual roles.
            </p>
          </>
        }
      />

      {experienceSections.map((section) => (
        <section
          key={section.id}
          className="experience-page__section"
          aria-labelledby={`experience-${section.id}`}
        >
          <div className="experience-page__section-header">
            <h2 id={`experience-${section.id}`} className="experience-page__section-heading">
              {section.heading}
            </h2>
            {section.id === 'work' ? (
              <p className="experience-page__section-link mono-label">
                <Link to={ROUTES.workCaseStudies}>All work case studies →</Link>
              </p>
            ) : null}
            {section.id === 'education' ? (
              <p className="experience-page__section-link mono-label">
                <Link to={ROUTES.research}>All research case studies →</Link>
              </p>
            ) : null}
          </div>
          <div className="experience-timeline">
            {section.entries.map((entry) => (
              <ExperienceEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </ContentPage>
  )
}
