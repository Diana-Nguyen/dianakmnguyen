import type { ExperienceEntry as ExperienceEntryType, ExperiencePhase } from '../data/types'

interface ExperienceEntryProps {
  entry: ExperienceEntryType
}

function PhaseContent({ phase }: { phase: ExperiencePhase }) {
  return (
    <div className="experience-entry__phase">
      <h4 className="experience-entry__phase-title">{phase.title}</h4>
      <p className="mono-label experience-entry__phase-period">{phase.period}</p>
      {phase.intro ? <p className="experience-entry__phase-intro">{phase.intro}</p> : null}
      {phase.bullets?.length ? (
        <ul className="experience-entry__list">
          {phase.bullets.map((bullet, index) => (
            <li key={`${phase.id}-bullet-${index}`}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {phase.groups?.map((group) => (
        <div key={group.heading} className="experience-entry__group">
          <h5 className="mono-label experience-entry__group-heading">{group.heading}</h5>
          <ul className="experience-entry__list">
            {group.bullets.map((bullet, index) => (
              <li key={`${phase.id}-${group.heading}-${index}`}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
      {phase.stack ? (
        <p className="mono-label experience-entry__stack">
          <span className="experience-entry__stack-label">Stack</span> · {phase.stack}
        </p>
      ) : null}
    </div>
  )
}

export function ExperienceEntry({ entry }: ExperienceEntryProps) {
  const hasBody =
    (entry.highlights?.length ?? 0) > 0 ||
    (entry.phases?.length ?? 0) > 0 ||
    (entry.tags?.length ?? 0) > 0

  if (!hasBody) {
    return (
      <article
        id={entry.id}
        className="experience-timeline__item experience-timeline__item--static"
      >
        <div className="experience-timeline__marker" aria-hidden="true" />
        <div className="experience-timeline__card experience-timeline__card--static kraft-frame">
          <p className="mono-label experience-timeline__dates">{entry.dateLabel}</p>
          <h3 className="experience-timeline__title">{entry.title}</h3>
          <p className="mono-label experience-timeline__org">{entry.organization}</p>
          {entry.location ? (
            <p className="mono-label experience-timeline__location">{entry.location}</p>
          ) : null}
          <p className="experience-timeline__teaser">{entry.summary}</p>
        </div>
      </article>
    )
  }

  return (
    <details id={entry.id} className="experience-timeline__item">
      <summary className="experience-timeline__summary">
        <span className="experience-timeline__marker" aria-hidden="true" />
        <span className="experience-timeline__card experience-timeline__card--expandable kraft-frame">
          <span className="experience-timeline__summary-grid">
            <span className="experience-timeline__summary-main">
              <span className="mono-label experience-timeline__dates">{entry.dateLabel}</span>
              <span className="experience-timeline__title">{entry.title}</span>
              <span className="mono-label experience-timeline__org">{entry.organization}</span>
              {entry.location ? (
                <span className="mono-label experience-timeline__location">{entry.location}</span>
              ) : null}
              <span className="experience-timeline__teaser">{entry.summary}</span>
            </span>
          </span>
        </span>
      </summary>
      <div className="experience-entry__body">
        {entry.tags?.length ? (
          <ul className="experience-entry__tags" aria-label="Topics">
            {entry.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
        {(entry.phases ?? []).map((phase) => (
          <PhaseContent key={phase.id} phase={phase} />
        ))}
        {entry.highlights?.length ? (
          <ul className="experience-entry__list">
            {entry.highlights.map((bullet, index) => (
              <li key={`${entry.id}-highlight-${index}`}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </details>
  )
}
