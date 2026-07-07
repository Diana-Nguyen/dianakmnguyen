import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SkipLink } from './components/SkipLink'
import { ScrollToTop } from './components/ScrollToTop'
import { ControlPanel } from './components/ControlPanel'
import { PageFallback } from './components/PageFallback'
import { ROUTES } from './data/routes'
import { HomePage } from './pages/HomePage'

const ExperiencePage = lazy(() =>
  import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })),
)
const ExperienceCaseStudiesIndexPage = lazy(() =>
  import('./pages/ExperienceCaseStudiesIndexPage').then((m) => ({
    default: m.ExperienceCaseStudiesIndexPage,
  })),
)
const ExperienceCaseStudyPage = lazy(() =>
  import('./pages/ExperienceCaseStudyPage').then((m) => ({
    default: m.ExperienceCaseStudyPage,
  })),
)
const GamesPage = lazy(() =>
  import('./pages/GamesPage').then((m) => ({ default: m.GamesPage })),
)
const CaseStudiesIndexPage = lazy(() =>
  import('./pages/CaseStudiesIndexPage').then((m) => ({ default: m.CaseStudiesIndexPage })),
)
const CaseStudyPage = lazy(() =>
  import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
)
const CardsPage = lazy(() =>
  import('./pages/CardsPage').then((m) => ({ default: m.CardsPage })),
)

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <SkipLink />
      <ScrollToTop />
      <ControlPanel />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route
            path="/experience/case-studies"
            element={<ExperienceCaseStudiesIndexPage />}
          />
          <Route path="/experience/case-studies/:slug" element={<ExperienceCaseStudyPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/research" element={<CaseStudiesIndexPage />} />
          <Route path="/research/:slug" element={<CaseStudyPage />} />
          <Route path="/research/overview" element={<Navigate to={ROUTES.research} replace />} />
          <Route path="/projects" element={<Navigate to={ROUTES.mainQuest} replace />} />
          <Route path="/work" element={<Navigate to={ROUTES.research} replace />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
