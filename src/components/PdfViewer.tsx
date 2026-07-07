import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import './PdfViewer.css'
import { assetUrl } from '../utils/assetUrl'

type PdfJsModule = {
  GlobalWorkerOptions: { workerSrc: string }
  getDocument: (params: { data: ArrayBuffer }) => { promise: Promise<PDFDocumentProxy> }
}

let pdfJsModulePromise: Promise<PdfJsModule> | null = null

function loadPdfJs() {
  pdfJsModulePromise ??= import(/* @vite-ignore */ `${import.meta.env.BASE_URL}pdf.mjs`) as Promise<PdfJsModule>
  return pdfJsModulePromise
}

export interface PdfViewerProps {
  src: string
  title: string
  caption?: string
  linkHref?: string
  linkLabel?: string
  /** Zoom multiplier relative to fit-to-width (1 = fit, 1.5 = 150%). */
  defaultZoom?: number
}

const DEFAULT_ZOOM = 1.25
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3
const ZOOM_STEP = 0.25

function clampZoom(value: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(value / ZOOM_STEP) * ZOOM_STEP))
}

function formatZoom(value: number) {
  return `${Math.round(value * 100)}%`
}

function resolvePdfUrl(src: string) {
  return new URL(assetUrl(src), window.location.origin).href
}

function isRenderCancelled(error: unknown) {
  return (
    error instanceof Error &&
    (error.message.includes('Rendering cancelled') ||
      error.message.includes('cancelled'))
  )
}

export function PdfViewer({
  src,
  title,
  caption,
  linkHref,
  linkLabel = 'Open PDF in new tab →',
  defaultZoom = DEFAULT_ZOOM,
}: PdfViewerProps) {
  const initialZoom = clampZoom(defaultZoom)
  const pdfUrl = useMemo(() => resolvePdfUrl(src), [src])
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pdfRef = useRef<PDFDocumentProxy | null>(null)
  const loadGenerationRef = useRef(0)
  const renderGenerationRef = useRef(0)
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null)

  const [pageCount, setPageCount] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [zoom, setZoom] = useState(initialZoom)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const goToPrev = useCallback(() => {
    setPageNum((current) => Math.max(1, current - 1))
  }, [])

  const goToNext = useCallback(() => {
    setPageNum((current) => Math.min(pageCount, current + 1))
  }, [pageCount])

  const zoomIn = useCallback(() => {
    setZoom((current) => clampZoom(current + ZOOM_STEP))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((current) => clampZoom(current - ZOOM_STEP))
  }, [])

  const resetZoom = useCallback(() => {
    setZoom(1)
  }, [])

  useEffect(() => {
    const generation = ++loadGenerationRef.current
    let cancelled = false
    const startingZoom = clampZoom(defaultZoom)

    async function loadPdf() {
      setStatus('loading')
      setPageCount(0)
      setPageNum(1)
      setZoom(startingZoom)

      try {
        const pdfjs = await loadPdfJs()
        pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`

        const response = await fetch(pdfUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF (${response.status})`)
        }

        const data = await response.arrayBuffer()
        if (cancelled || generation !== loadGenerationRef.current) return

        const loadingTask = pdfjs.getDocument({ data })
        const pdf = await loadingTask.promise
        if (cancelled || generation !== loadGenerationRef.current) {
          void pdf.cleanup()
          return
        }

        pdfRef.current = pdf
        setPageCount(pdf.numPages)
        setPageNum(1)
        setStatus('ready')
      } catch {
        if (cancelled || generation !== loadGenerationRef.current) return
        setStatus('error')
      }
    }

    void loadPdf()

    return () => {
      cancelled = true
      renderTaskRef.current?.cancel()
      if (pdfRef.current) {
        void pdfRef.current.cleanup()
        pdfRef.current = null
      }
    }
  }, [defaultZoom, pdfUrl])

  useEffect(() => {
    const pdf = pdfRef.current
    if (status !== 'ready' || !pdf) return

    const viewportEl = viewportRef.current
    const canvas = canvasRef.current
    if (!viewportEl || !canvas) return

    let cancelled = false
    let resizeTimer = 0

    const renderPage = async () => {
      const generation = ++renderGenerationRef.current
      renderTaskRef.current?.cancel()

      try {
        const page = await pdf.getPage(pageNum)
        if (cancelled || generation !== renderGenerationRef.current) return

        const containerWidth = viewportEl.clientWidth
        if (containerWidth <= 0) return

        const baseViewport = page.getViewport({ scale: 1 })
        const scale = (containerWidth / baseViewport.width) * zoom
        const viewport = page.getViewport({ scale })

        const context = canvas.getContext('2d')
        if (!context) return

        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`

        const renderTask = page.render({ canvasContext: context, viewport })
        renderTaskRef.current = renderTask
        await renderTask.promise
      } catch (error) {
        if (cancelled || generation !== renderGenerationRef.current) return
        if (isRenderCancelled(error)) return
        setStatus('error')
      }
    }

    void renderPage()

    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        void renderPage()
      }, 150)
    })
    observer.observe(viewportEl)

    return () => {
      cancelled = true
      window.clearTimeout(resizeTimer)
      observer.disconnect()
      renderTaskRef.current?.cancel()
    }
  }, [pageNum, status, zoom])

  useEffect(() => {
    const viewportEl = viewportRef.current
    if (!viewportEl || status !== 'ready') return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      }
    }

    viewportEl.addEventListener('keydown', handleKeyDown)
    return () => viewportEl.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, status])

  const openHref = assetUrl(linkHref ?? src)

  return (
    <figure className="research-study__pdf" aria-label={title}>
      <div className="research-study__pdf-toolbar">
        <div className="research-study__pdf-toolbar-group">
          <button
            type="button"
            className="research-study__pdf-nav"
            onClick={goToPrev}
            disabled={status !== 'ready' || pageNum <= 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          <p className="research-study__pdf-status mono-label" aria-live="polite">
            {status === 'loading'
              ? 'Loading…'
              : status === 'error'
                ? 'Could not load PDF'
                : `Page ${pageNum} of ${pageCount}`}
          </p>
          <button
            type="button"
            className="research-study__pdf-nav"
            onClick={goToNext}
            disabled={status !== 'ready' || pageNum >= pageCount}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
        <div className="research-study__pdf-toolbar-group">
          <button
            type="button"
            className="research-study__pdf-nav"
            onClick={zoomOut}
            disabled={status !== 'ready' || zoom <= ZOOM_MIN}
            aria-label="Zoom out"
          >
            −
          </button>
          <p className="research-study__pdf-zoom-label mono-label" aria-live="polite">
            {formatZoom(zoom)}
          </p>
          <button
            type="button"
            className="research-study__pdf-nav"
            onClick={zoomIn}
            disabled={status !== 'ready' || zoom >= ZOOM_MAX}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="research-study__pdf-nav"
            onClick={resetZoom}
            disabled={status !== 'ready' || zoom === 1}
            aria-label="Reset zoom to fit width"
          >
            Fit
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="research-study__pdf-viewport"
        tabIndex={0}
        aria-roledescription="PDF document"
        aria-label={`${title}, page ${pageNum}`}
      >
        {status === 'error' ? (
          <p className="research-study__pdf-error">
            This PDF could not be displayed inline.{' '}
            <a href={openHref} target="_blank" rel="noopener noreferrer">
              Open it in a new tab
            </a>
            .
          </p>
        ) : (
          <canvas ref={canvasRef} className="research-study__pdf-canvas" />
        )}
      </div>

      {caption ? (
        <figcaption className="research-study__pdf-caption">{caption}</figcaption>
      ) : null}

      <p className="research-study__pdf-link mono-label">
        <a href={openHref} target="_blank" rel="noopener noreferrer">
          {linkLabel}
        </a>
      </p>
    </figure>
  )
}
