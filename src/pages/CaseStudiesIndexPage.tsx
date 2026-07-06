import { ResearchCaseStudySection } from '../components/ResearchCaseStudySection'
import { ContentPage, ContentPageHeader } from '../components/content-page/ContentPage'
import { caseStudies } from '../data/case-studies'
import { BACK_TO_MAIN_QUEST } from '../data/routes'
import './research-case-studies.css'

export function CaseStudiesIndexPage() {
  return (
    <ContentPage width="wide">
      <ContentPageHeader
        {...BACK_TO_MAIN_QUEST}
        title="UX Research & Prototyping"
        intro="Case studies from my HCI Master's program at DePaul University — scroll the write-ups or jump from Sys.nav."
      />
      <div className="research-studies-content">
        {caseStudies.map((study) => (
          <ResearchCaseStudySection key={study.slug} study={study} />
        ))}
      </div>
    </ContentPage>
  )
}
