import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  experienceNavSections,
  experienceWorkEntries,
  scrollToExperienceAnchor,
} from '../data/experience-nav'
import { ROUTES } from '../data/routes'
import {
  researchCaseStudyIds,
  researchCaseStudyNav,
  scrollToResearchAnchor,
} from '../data/research-nav'
import { workCaseStudyNav } from '../data/work-case-studies-nav'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { scrollToAnchor } from '../utils/scrollToAnchor'
import './ControlPanel.css'

const HOME_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Main quest' },
  { id: 'side-quests', label: 'Side quests' },
  { id: 'contact', label: 'Contact' },
] as const

const POS_KEY = 'control-panel-position'
const COLLAPSED_KEY = 'control-panel-collapsed'

type SectionId = (typeof HOME_SECTIONS)[number]['id']

type PanelPosition = { x: number; y: number }

function clampPosition(x: number, y: number, width: number, height: number): PanelPosition {
  const margin = 8
  return {
    x: Math.max(margin, Math.min(x, window.innerWidth - width - margin)),
    y: Math.max(margin, Math.min(y, window.innerHeight - height - margin)),
  }
}

function defaultPosition(width: number, height: number): PanelPosition {
  const margin = window.innerWidth >= 768 ? 20 : 16
  const w = Math.max(width, 1)
  const h = Math.max(height, 1)
  return clampPosition(window.innerWidth - w - margin, margin, w, h)
}

export function ControlPanel() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const onExperience = pathname === '/experience'
  const onResearch = pathname === '/research'
  const onWorkCaseStudies = pathname.startsWith('/experience/case-studies')
  const activeWorkCaseStudySlug = onWorkCaseStudies
    ? pathname.replace(/^\/experience\/case-studies\/?/, '').split('/')[0] || null
    : null
  const { activeId: activeResearchSlug, setActiveId: setActiveResearchSlug } = useScrollSpy(
    researchCaseStudyIds,
    onResearch,
  )
  const panelRef = useRef<HTMLElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const [active, setActive] = useState<SectionId>(() => {
    if (typeof window === 'undefined') return 'hero'
    const hash = window.location.hash.replace('#', '') as SectionId
    return HOME_SECTIONS.some((s) => s.id === hash) ? hash : 'hero'
  })
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem(COLLAPSED_KEY)
      if (saved === null) return true
      return saved === 'true'
    } catch {
      return true
    }
  })
  const [position, setPosition] = useState<PanelPosition | null>(null)
  const [dragging, setDragging] = useState(false)

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '') as SectionId
    if (HOME_SECTIONS.some((s) => s.id === hash)) setActive(hash)
  }, [])

  useEffect(() => {
    if (!onHome) return

    window.addEventListener('hashchange', syncFromHash)

    const sections = HOME_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!sections.length) return () => window.removeEventListener('hashchange', syncFromHash)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.55] },
    )

    sections.forEach((el) => observer.observe(el!))

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [onHome, syncFromHash])

  const panelCollapsed = onExperience || onResearch || onWorkCaseStudies ? false : collapsed

  useEffect(() => {
    const el = panelRef.current
    if (!el) return

    const applyPosition = () => {
      const { offsetWidth, offsetHeight } = el
      const w = offsetWidth || el.getBoundingClientRect().width
      const h = offsetHeight || el.getBoundingClientRect().height

      try {
        const saved = localStorage.getItem(POS_KEY)
        if (saved) {
          const parsed = JSON.parse(saved) as PanelPosition
          setPosition(clampPosition(parsed.x, parsed.y, w, h))
          return
        }
      } catch {
        /* ignore */
      }

      setPosition(defaultPosition(w, h))
    }

    applyPosition()
    const frame = requestAnimationFrame(applyPosition)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!position) return
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(position))
    } catch {
      /* ignore */
    }
  }, [position])

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, String(collapsed))
    } catch {
      /* ignore */
    }
  }, [collapsed])

  useEffect(() => {
    if (!position || !panelRef.current) return

    const onResize = () => {
      const el = panelRef.current
      if (!el) return
      setPosition((prev) =>
        prev ? clampPosition(prev.x, prev.y, el.offsetWidth, el.offsetHeight) : prev,
      )
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [position])

  const goTo = (id: SectionId) => {
    setActive(id)
    scrollToAnchor(id, { updateHash: true })
  }

  const onDragStart = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return
    const el = panelRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    isDraggingRef.current = true
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onDragMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || !panelRef.current) return

    const { offsetWidth, offsetHeight } = panelRef.current
    const next = clampPosition(
      e.clientX - dragOffset.current.x,
      e.clientY - dragOffset.current.y,
      offsetWidth,
      offsetHeight,
    )
    setPosition(next)
  }

  const onDragEnd = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const panelStyle =
    position != null
      ? { left: position.x, top: position.y, right: 'auto' as const }
      : undefined

  return (
    <aside
      ref={panelRef}
      className={`control-panel${panelCollapsed ? ' control-panel--collapsed' : ''}${dragging ? ' control-panel--dragging' : ''}`}
      style={panelStyle}
      aria-label="Site controls"
    >
      <div className="control-panel__window">
        <div
          className="control-panel__header"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <div className="control-panel__chrome" aria-hidden>
            <span />
            <span />
            <span />
          </div>

          <div className="control-panel__titlebar">
            <span className="mono-label control-panel__title">Sys.nav</span>
            <button
              type="button"
              className="control-panel__collapse"
              aria-expanded={!panelCollapsed}
              aria-controls="control-panel-body"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setCollapsed((c) => !c)}
            >
              {panelCollapsed ? '+' : '−'}
            </button>
          </div>
        </div>

        <div
          id="control-panel-body"
          className="control-panel__body"
          hidden={panelCollapsed}
        >
          {onHome ? (
            <nav className="control-panel__nav" aria-label="Page sections">
              <ul className="control-panel__links">
                {HOME_SECTIONS.map(({ id, label }) => (
                  <li key={id} className={id === 'contact' ? 'control-panel__link-item--wide' : undefined}>
                    <button
                      type="button"
                      className="control-panel__link"
                      aria-current={active === id ? 'true' : undefined}
                      aria-label={id === 'side-quests' ? 'Side quests' : label}
                      onClick={() => goTo(id)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ) : onExperience ? (
            <nav className="control-panel__nav control-panel__nav--experience" aria-label="Experience">
              <Link to={ROUTES.mainQuest} className="control-panel__home">
                ← Main quest
              </Link>
              <ul className="control-panel__experience-list">
                {experienceNavSections.map(({ anchorId, label, sectionId }) => (
                  <li key={anchorId} className="control-panel__experience-group">
                    <button
                      type="button"
                      className="control-panel__link control-panel__link--section"
                      onClick={() => scrollToExperienceAnchor(anchorId)}
                    >
                      {label}
                    </button>
                    {sectionId === 'work' ? (
                      <ul className="control-panel__sublist">
                        {experienceWorkEntries.map(({ anchorId: entryId, label: entryLabel }) => (
                          <li key={entryId}>
                            <button
                              type="button"
                              className="control-panel__sublink"
                              onClick={() => scrollToExperienceAnchor(entryId)}
                            >
                              {entryLabel}
                            </button>
                          </li>
                        ))}
                        <li>
                          <Link
                            to={ROUTES.workCaseStudies}
                            className="control-panel__sublink control-panel__sublink--route"
                          >
                            Case studies
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                    {sectionId === 'education' ? (
                      <ul className="control-panel__sublist">
                        <li>
                          <Link
                            to={ROUTES.research}
                            className="control-panel__sublink control-panel__sublink--route"
                          >
                            Research case studies
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          ) : onResearch ? (
            <nav className="control-panel__nav control-panel__nav--experience" aria-label="UX Research">
              <Link to={ROUTES.mainQuest} className="control-panel__home">
                ← Main quest
              </Link>
              <ul className="control-panel__experience-list">
                {researchCaseStudyNav.map(({ anchorId, label }) => (
                  <li key={anchorId}>
                    <button
                      type="button"
                      className="control-panel__sublink"
                      aria-current={activeResearchSlug === anchorId ? 'true' : undefined}
                      onClick={() => {
                        setActiveResearchSlug(anchorId)
                        scrollToResearchAnchor(anchorId)
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ) : onWorkCaseStudies ? (
            <nav className="control-panel__nav control-panel__nav--experience" aria-label="Work case studies">
              <Link to={ROUTES.mainQuest} className="control-panel__home">
                ← Main quest
              </Link>
              <ul className="control-panel__experience-list">
                {workCaseStudyNav.map(({ slug, label }) => (
                  <li key={slug}>
                    <Link
                      to={ROUTES.workCaseStudy(slug)}
                      className="control-panel__sublink"
                      aria-current={activeWorkCaseStudySlug === slug ? 'true' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <nav className="control-panel__nav" aria-label="Site">
              <Link to={ROUTES.home} className="control-panel__home">
                ← Home
              </Link>
            </nav>
          )}

          <div className="control-panel__dock" aria-label="Media and effects">
            <p className="mono-label control-panel__dock-label">Audio · FX</p>
            <div className="control-panel__dock-well" aria-hidden>
              <span className="control-panel__meter" />
              <span className="control-panel__meter" />
              <span className="control-panel__meter" />
              <span className="control-panel__meter" />
            </div>
            <p className="control-panel__dock-hint">plug-in slot</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
