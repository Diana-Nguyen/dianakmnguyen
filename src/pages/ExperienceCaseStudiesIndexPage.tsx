import { WorkCaseStudyCard } from '../components/WorkCaseStudyCard'
import { ContentPage, ContentPageHeader } from '../components/content-page/ContentPage'
import {
  groupWorkCaseStudiesByProduct,
  sortWorkCaseStudies,
  sortWorkCaseStudyProductGroups,
} from '../data/experience-sort'
import { BACK_TO_MAIN_QUEST } from '../data/routes'
import { workCaseStudies } from '../data/work-case-studies'

const studies = sortWorkCaseStudies(workCaseStudies)

export function ExperienceCaseStudiesIndexPage() {
  const groups = groupWorkCaseStudiesByProduct(studies)

  return (
    <ContentPage width="wide">
      <ContentPageHeader
        {...BACK_TO_MAIN_QUEST}
        title="Product & Engineering"
        intro={
          <>
            Frontend engineering write-ups from HBO Max and Discovery+ — checkout, design systems,
            accessibility, observability, testing, and auth.
          </>
        }
      />

      {sortWorkCaseStudyProductGroups(groups).map(([product, items]) => (
        <section
          key={product}
          className="content-page__group"
          aria-labelledby={`work-case-group-${product.replace(/\W+/g, '-')}`}
        >
          <h2
            id={`work-case-group-${product.replace(/\W+/g, '-')}`}
            className="content-page__group-heading mono-label"
          >
            {product}
          </h2>
          <div className="content-page__grid">
            {items.map((study) => (
              <WorkCaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </section>
      ))}
    </ContentPage>
  )
}
