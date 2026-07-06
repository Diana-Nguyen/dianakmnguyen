import raw from './experience.json'
import { sortExperienceSections } from './experience-sort'
import type { ExperienceData, ExperienceSection } from './types'

const data = raw as ExperienceData

export const experienceSections: ExperienceSection[] = sortExperienceSections(data.sections)
