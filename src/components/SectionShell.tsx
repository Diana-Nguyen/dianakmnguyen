import type { ReactNode } from 'react'

type SectionVariant = 'cream' | 'about' | 'forest' | 'deep'

interface SectionShellProps {
  id: string
  variant: SectionVariant
  labelledBy: string
  children: ReactNode
  className?: string
  /** Content-height section instead of full viewport min-height */
  compact?: boolean
}

const variantClass: Record<SectionVariant, string> = {
  cream: 'section--cream',
  about: 'section--about',
  forest: 'section--forest',
  deep: 'section--deep',
}

export function SectionShell({
  id,
  variant,
  labelledBy,
  children,
  className = '',
  compact = false,
}: SectionShellProps) {
  const gridExtra =
    variant === 'forest' || variant === 'deep'
      ? 'grid-bg--forest grid-bg--dark'
      : variant === 'about'
        ? 'grid-bg--dark'
        : ''

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`grid-bg ${variantClass[variant]} ${gridExtra} ${className}`.trim()}
      style={compact ? undefined : { minHeight: 'var(--section-min-h)' }}
    >
      {children}
    </section>
  )
}
