import { Link, useParams } from 'react-router-dom'
import {
  ContentPage,
  ContentPageHeader,
  ContentPageNotFound,
  ContentPageParagraphList,
  ContentPageSection,
  ContentPageTagList,
} from '../components/content-page/ContentPage'
import { BACK_TO_WORK_CASE_STUDIES } from '../data/routes'
import { findWorkCaseStudy } from '../data/work-case-studies'

export function ExperienceCaseStudyPage() {
  const { slug } = useParams()
  const study = slug ? findWorkCaseStudy(slug) : undefined

  if (!study) {
    return (
      <ContentPageNotFound
        message="Case study not found."
        {...BACK_TO_WORK_CASE_STUDIES}
      />
    )
  }

  return (
    <ContentPage width="wide">
      <article className="content-page__body">
        <ContentPageHeader
          {...BACK_TO_WORK_CASE_STUDIES}
          title={study.title}
          subtitle={`${study.role} · ${study.product}`}
        />
        <ContentPageTagList tags={study.tags} />
        <p className="content-page__oneliner">{study.oneLiner}</p>

        <ContentPageSection id="gap" title="The gap">
          <ContentPageParagraphList
            slug={study.slug}
            sectionId="gap"
            paragraphs={study.gap}
          />
        </ContentPageSection>

        <ContentPageSection id="what-i-did" title="What I did">
          <ContentPageParagraphList
            slug={study.slug}
            sectionId="what-i-did"
            paragraphs={study.whatIDid}
          />
        </ContentPageSection>

        <ContentPageSection id="what-happened" title="What happened">
          <ContentPageParagraphList
            slug={study.slug}
            sectionId="what-happened"
            paragraphs={study.whatHappened}
          />
        </ContentPageSection>

        <p className="content-page__footer mono-label">
          <Link to="/experience#experience-work">← Warner Bros. Discovery on experience</Link>
        </p>
      </article>
    </ContentPage>
  )
}
