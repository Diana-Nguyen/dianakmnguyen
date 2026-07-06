import { sortWorkCaseStudies } from './experience-sort'
import { workCaseStudies } from './work-case-studies'

export const workCaseStudyNav = sortWorkCaseStudies(workCaseStudies).map((study) => ({
  slug: study.slug,
  label: study.title,
}))
