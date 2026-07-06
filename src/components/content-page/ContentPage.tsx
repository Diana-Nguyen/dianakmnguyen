import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './content-page.css'

export type ContentPageVariant = 'cream' | 'forest' | 'deep'
export type ContentPageWidth = 'narrow' | 'medium' | 'wide'

const variantClass: Record<ContentPageVariant, string> = {
  cream: 'section--cream',
  forest: 'section--forest grid-bg--forest grid-bg--dark',
  deep: 'section--deep grid-bg--forest grid-bg--dark',
}

const widthClass: Record<ContentPageWidth, string> = {
  narrow: 'content-page__inner--narrow',
  medium: 'content-page__inner--medium',
  wide: 'content-page__inner--wide',
}

interface ContentPageProps {
  variant?: ContentPageVariant
  width?: ContentPageWidth
  className?: string
  children: ReactNode
}

export function ContentPage({
  variant = 'cream',
  width = 'wide',
  className = '',
  children,
}: ContentPageProps) {
  const forestOrDeep = variant === 'forest' || variant === 'deep'

  return (
    <main
      id="main-content"
      className={[
        'content-page',
        'grid-bg',
        variantClass[variant],
        forestOrDeep ? 'content-page--forest' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['content-page__inner', widthClass[width]].join(' ')}>
        {children}
      </div>
    </main>
  )
}

interface ContentPageHeaderProps {
  backTo: string
  backLabel: string
  title: string
  subtitle?: ReactNode
  intro?: ReactNode
}

export function ContentPageHeader({
  backTo,
  backLabel,
  title,
  subtitle,
  intro,
}: ContentPageHeaderProps) {
  return (
    <header className="content-page__header">
      <Link to={backTo} className="mono-label content-page__back">
        {backLabel}
      </Link>
      <h1 className="display-heading">{title}</h1>
      {subtitle ? (
        <p className="mono-label content-page__subtitle">{subtitle}</p>
      ) : null}
      {intro ? <div className="content-page__intro">{intro}</div> : null}
    </header>
  )
}

interface ContentPageSectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function ContentPageSection({
  id,
  title,
  children,
  className = '',
}: ContentPageSectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      className={['content-page__section', className].filter(Boolean).join(' ')}
      aria-labelledby={headingId}
    >
      <h2 id={headingId}>{title}</h2>
      {children}
    </section>
  )
}

interface ContentPageBulletListProps {
  slug: string
  sectionId: string
  items: string[]
}

export function ContentPageBulletList({
  slug,
  sectionId,
  items,
}: ContentPageBulletListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={`${slug}-${sectionId}-${index}`}>{item}</li>
      ))}
    </ul>
  )
}

interface ContentPageTagListProps {
  tags: string[]
}

export function ContentPageTagList({ tags }: ContentPageTagListProps) {
  return (
    <ul className="content-page__tags" aria-label="Topics">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  )
}

interface ContentPageParagraphListProps {
  slug: string
  sectionId: string
  paragraphs: string[]
}

export function ContentPageParagraphList({
  slug,
  sectionId,
  paragraphs,
}: ContentPageParagraphListProps) {
  return (
    <>
      {paragraphs.map((para, index) => (
        <p key={`${slug}-${sectionId}-${index}`}>{para}</p>
      ))}
    </>
  )
}

interface ContentPageProjectCardProps {
  id: string
  title: string
  role: string
  description: string
  highlights?: string[]
  details?: string[]
}

export function ContentPageProjectCard({
  id,
  title,
  role,
  description,
  highlights,
  details,
}: ContentPageProjectCardProps) {
  return (
    <article className="content-page__card kraft-frame">
      <h2 className="display-heading">{title}</h2>
      <p className="mono-label">{role}</p>
      <p className="content-page__card-summary">{description}</p>
      {details?.map((paragraph, index) => (
        <p key={`${id}-detail-${index}`}>{paragraph}</p>
      ))}
      {highlights?.length ? (
        <ul>
          {highlights.map((item, index) => (
            <li key={`${id}-highlight-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

interface ContentPageNotFoundProps {
  message?: string
  backTo: string
  backLabel: string
  variant?: ContentPageVariant
}

export function ContentPageNotFound({
  message = 'Page not found.',
  backTo,
  backLabel,
  variant = 'cream',
}: ContentPageNotFoundProps) {
  return (
    <ContentPage variant={variant} width="narrow">
      <div className="content-page__not-found">
        <p>{message}</p>
        <Link to={backTo} className="mono-label">
          {backLabel}
        </Link>
      </div>
    </ContentPage>
  )
}
