import { scrollToAnchor } from '../utils/scrollToAnchor'
import { caseStudies } from './case-studies'

export const researchCaseStudyNav = caseStudies.map((study) => ({
  anchorId: study.slug,
  label: study.title,
}))

export const researchCaseStudyIds = caseStudies.map((study) => study.slug)

export function scrollToResearchAnchor(anchorId: string) {
  scrollToAnchor(anchorId, { updateHash: true })
}
