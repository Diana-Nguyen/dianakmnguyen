import type { ExperienceEntry, ExperiencePhase, ExperienceSection, WorkCaseStudy } from './types'

const WBD_PHASE_ORDER = ['hbo-max', 'discovery-plus'] as const

export const WORK_CASE_STUDY_PRODUCT_ORDER = [
  'HBO Max',
  'Discovery+ → HBO Max',
  'Discovery+',
] as const

function sortKey(entry: ExperienceEntry): number {
  const end = entry.endDate ?? '9999-12'
  const start = entry.startDate
  return new Date(`${end}-01`).getTime() * 10 + new Date(`${start}-01`).getTime()
}

function orderIndex<T extends readonly string[]>(order: T, value: string): number {
  const index = order.indexOf(value as T[number])
  return index === -1 ? order.length : index
}

export function compareWorkCaseStudyProducts(a: string, b: string): number {
  return (
    orderIndex(WORK_CASE_STUDY_PRODUCT_ORDER, a) -
    orderIndex(WORK_CASE_STUDY_PRODUCT_ORDER, b)
  )
}

export function sortWbdPhases(phases: ExperiencePhase[]): ExperiencePhase[] {
  return [...phases].sort(
    (a, b) => orderIndex(WBD_PHASE_ORDER, a.id) - orderIndex(WBD_PHASE_ORDER, b.id),
  )
}

export function sortWorkCaseStudies(studies: WorkCaseStudy[]): WorkCaseStudy[] {
  return [...studies].sort(
    (a, b) =>
      orderIndex(WORK_CASE_STUDY_PRODUCT_ORDER, a.product) -
      orderIndex(WORK_CASE_STUDY_PRODUCT_ORDER, b.product),
  )
}

export function groupWorkCaseStudiesByProduct(
  items: WorkCaseStudy[],
): Map<string, WorkCaseStudy[]> {
  const groups = new Map<string, WorkCaseStudy[]>()
  for (const study of items) {
    const list = groups.get(study.product) ?? []
    list.push(study)
    groups.set(study.product, list)
  }
  return groups
}

export function sortWorkCaseStudyProductGroups(
  groups: Map<string, WorkCaseStudy[]>,
): [string, WorkCaseStudy[]][] {
  return [...groups.entries()].sort(([a], [b]) => compareWorkCaseStudyProducts(a, b))
}

export function sortExperienceSections(
  sections: ExperienceSection[],
): ExperienceSection[] {
  return sections.map((section) => ({
    ...section,
    entries: [...section.entries]
      .sort((a, b) => sortKey(b) - sortKey(a))
      .map((entry) =>
        entry.phases?.length
          ? { ...entry, phases: sortWbdPhases(entry.phases) }
          : entry,
      ),
  }))
}
