import raw from './projects.json'
import type { ProjectItem } from './types'

export const projects = raw as ProjectItem[]

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((item) => item.slug === slug)
}
