import raw from './about-previews.json'

export interface PreviewSlide {
  id: string
  title: string
  subtitle: string
  accent: 'forest' | 'gold' | 'sage'
  src: string
  alt?: string
}

export const aboutPreviews = raw as PreviewSlide[]
