import { scrollToAnchor } from '../utils/scrollToAnchor'
import { experienceSections } from './experience'

const workSection = experienceSections.find((section) => section.id === 'work')

export const experienceNavSections = experienceSections.map((section) => ({
  anchorId: `experience-${section.id}`,
  label: section.heading,
  sectionId: section.id,
}))

export const experienceWorkEntries =
  workSection?.entries.map((entry) => ({
    anchorId: entry.id,
    label: entry.title,
  })) ?? []

export function scrollToExperienceAnchor(anchorId: string) {
  scrollToAnchor(anchorId, { updateHash: true })
}
