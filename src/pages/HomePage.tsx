import { lazy, Suspense, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { StickerLayoutProvider } from '../components/StickerLayoutContext'

const Work = lazy(() => import('../sections/Work').then((m) => ({ default: m.Work })))
const Fixations = lazy(() =>
  import('../sections/Fixations').then((m) => ({ default: m.Fixations })),
)

function HomeSectionFallback() {
  return <div className="home-section-fallback" aria-hidden />
}

export function HomePage() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return

        gsap.registerPlugin(ScrollTrigger)

        const sections = gsap.utils
          .toArray<HTMLElement>('.grid-bg')
          .filter((section) => section.id !== 'contact')
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0.92,
            duration: 0.6,
            ease: 'power2.out',
          })
        })
      },
    )

    return () => {
      cancelled = true
      void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [reduceMotion])

  return (
    <StickerLayoutProvider>
      <main id="main-content">
        <Hero />
        <About />
        <Suspense fallback={<HomeSectionFallback />}>
          <Work />
        </Suspense>
        <Suspense fallback={<HomeSectionFallback />}>
          <Fixations />
        </Suspense>
        <Contact />
      </main>
    </StickerLayoutProvider>
  )
}
