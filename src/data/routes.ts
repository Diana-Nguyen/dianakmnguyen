export const ROUTES = {
  home: '/',
  mainQuest: '/#work',
  experience: '/experience',
  workCaseStudies: '/experience/case-studies',
  workCaseStudy: (slug: string) => `/experience/case-studies/${slug}`,
  research: '/research',
  games: '/games',
  cards: '/cards',
} as const

export const BACK_TO_MAIN_QUEST = {
  backTo: ROUTES.mainQuest,
  backLabel: '← Back to main quest',
} as const

export const BACK_TO_WORK_CASE_STUDIES = {
  backTo: ROUTES.workCaseStudies,
  backLabel: '← All work case studies',
} as const

export const BACK_TO_RESEARCH = {
  backTo: ROUTES.research,
  backLabel: '← Back to UX research & prototyping',
} as const
