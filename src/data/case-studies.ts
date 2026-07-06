import raw from './case-studies.json'
import type { CaseStudy } from './types'

export const caseStudies = raw as CaseStudy[]

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug)
}
