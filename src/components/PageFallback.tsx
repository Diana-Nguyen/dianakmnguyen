import './PageFallback.css'

export function PageFallback() {
  return (
    <main id="main-content" className="page-fallback grid-bg section--cream" aria-busy="true">
      <p className="mono-label page-fallback__text">Loading…</p>
    </main>
  )
}
