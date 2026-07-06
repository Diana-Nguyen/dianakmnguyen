import type { CaseStudy, CaseStudySection } from '../data/types'
import {
  ContentPageBulletList,
  ContentPageSection,
} from './content-page/ContentPage'
import { ResearchCaseStudyBlocks } from './ResearchCaseStudyBlocks'
import './ResearchCaseStudySection.css'

interface ResearchCaseStudySectionProps {
  study: CaseStudy
}

function sectionClassName(section: CaseStudySection): string {
  if (section.variant === 'callout' || section.id === 'accessibility') {
    return 'content-page__section--callout'
  }

  return ''
}

export function ResearchCaseStudySection({ study }: ResearchCaseStudySectionProps) {
  return (
    <article id={study.slug} className="research-study kraft-frame">
      <div className="research-study__intro">
        {study.previewImage ? (
          <div className="research-study__preview">
            <img
              src={study.previewImage}
              alt={study.previewAlt ?? ''}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <header className="research-study__header">
          <h2 className="research-study__title">{study.title}</h2>
          <p className="mono-label research-study__meta">{study.role}</p>
          <ul className="research-study__methods" aria-label="Methods">
            {study.methods.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
          <p className="research-study__summary">{study.summary}</p>
        </header>
      </div>

      {study.timeline || study.tools?.length ? (
        <ContentPageSection
          id={`${study.slug}-process`}
          title="Process"
          className="research-study__process"
        >
          {study.timeline ? (
            <ol
              className="research-study__process-steps"
              aria-label="Project phases"
            >
              {study.timeline.split(' → ').map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
          {study.tools?.length ? (
            <p className="research-study__process-tools">
              Tools · {study.tools.join(', ')}
            </p>
          ) : null}
        </ContentPageSection>
      ) : null}

      <ContentPageSection id={`${study.slug}-highlights`} title="Highlights">
        <ContentPageBulletList
          slug={study.slug}
          sectionId="highlights"
          items={study.highlights}
        />
      </ContentPageSection>

      {study.sections.map((section) => (
        <ContentPageSection
          key={section.id}
          id={`${study.slug}-${section.id}`}
          title={section.title}
          className={sectionClassName(section)}
        >
          <ResearchCaseStudyBlocks
            slug={study.slug}
            sectionId={section.id}
            blocks={section.blocks}
          />
        </ContentPageSection>
      ))}
    </article>
  )
}
