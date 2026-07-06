export interface SiteData {
  name: string
  title: string
  location: string
  tagline: string
  heroSubtitle: string
  heroStickerHint: string
  about: {
    bio: string[]
    credentials: string[]
    previewLabel: string
    viewExperience: string
  }
  mainQuestIntro: string
  sideQuestsIntro: string
  links: {
    email: string
    linkedin: string
    github: string
    resume?: string
  }
}

export interface PolaroidSlide {
  id: string
  label: string
  src: string
  orientation: 'portrait' | 'landscape'
}

export interface StickerConfig {
  id: string
  section: 'hero' | 'about' | 'work' | 'side-quests'
  src: string
  alt: string
  decorative?: boolean
  x: number
  y: number
  rotation?: number
  zIndex?: number
  /** Internal route opened on double-click */
  href?: string
  /** Native tooltip for interactive stickers */
  hint?: string
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  role: string
  period?: string
  description: string
  tags: string[]
  href?: string
  highlights?: string[]
  details?: string[]
  typeLabel?: string
  type: 'work' | 'project'
}

export interface CaseStudyEmbedItem {
  label?: string
  src: string
  title: string
  linkHref?: string
  linkLabel?: string
}

export interface CaseStudyFigureItem {
  label?: string
  src: string
  alt: string
  caption?: string
}

export type CaseStudyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'figure'; src: string; alt: string; caption?: string }
  | {
      type: 'figurePair'
      items: [CaseStudyFigureItem, CaseStudyFigureItem]
    }
  | {
      type: 'embed'
      src: string
      title: string
      height?: number
      linkHref?: string
      linkLabel?: string
    }
  | {
      type: 'embedPair'
      height?: number
      items: [CaseStudyEmbedItem, CaseStudyEmbedItem]
    }
  | {
      type: 'pdf'
      src: string
      title: string
      caption?: string
      linkHref?: string
      linkLabel?: string
      /** Zoom multiplier relative to fit-to-width (1 = fit, 1.5 = 150%). */
      defaultZoom?: number
    }

export interface CaseStudySection {
  id: string
  title: string
  variant?: 'callout'
  blocks: CaseStudyBlock[]
}

export interface CaseStudy {
  slug: string
  title: string
  role: string
  timeline?: string
  tools?: string[]
  summary: string
  methods: string[]
  highlights: string[]
  previewImage?: string
  previewAlt?: string
  /** When false, omitted from the home page preview grid. Defaults to true. */
  featuredOnHome?: boolean
  sections: CaseStudySection[]
}

export type ExperienceSectionId =
  | 'work'
  | 'education'
  | 'certifications'
  | 'volunteering'

export interface WorkCaseStudy {
  slug: string
  title: string
  role: string
  product: string
  tags: string[]
  oneLiner: string
  gap: string[]
  whatIDid: string[]
  whatHappened: string[]
}

export interface ExperiencePhaseGroup {
  heading: string
  bullets: string[]
}

export interface ExperiencePhase {
  id: string
  title: string
  period: string
  intro?: string
  stack?: string
  groups?: ExperiencePhaseGroup[]
  bullets?: string[]
}

export interface ExperienceEntry {
  id: string
  organization: string
  title: string
  location?: string
  startDate: string
  endDate: string | null
  dateLabel: string
  summary: string
  highlights?: string[]
  phases?: ExperiencePhase[]
  tags?: string[]
}

export interface ExperienceSection {
  id: ExperienceSectionId
  heading: string
  entries: ExperienceEntry[]
}

export interface ExperienceData {
  sections: ExperienceSection[]
}
