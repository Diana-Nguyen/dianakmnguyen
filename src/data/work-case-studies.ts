import raw from './work-case-studies.json'
import type { WorkCaseStudy } from './types'

export const workCaseStudies = raw as WorkCaseStudy[]

export function findWorkCaseStudy(slug: string): WorkCaseStudy | undefined {
  return workCaseStudies.find((item) => item.slug === slug)
}
