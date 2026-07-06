import { useRef, type CSSProperties, type RefObject } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { StickerConfig } from '../data/types'
import './Sticker.css'

export type StickerLayoutMode = 'mess' | 'tidy'

interface StickerProps {
  sticker: StickerConfig
  persistKey: string
  layoutMode?: StickerLayoutMode
  tidyPosition?: { x: number; y: number; rotation: number }
  initialPosition?: { x: number; y: number }
  dragContainerRef?: RefObject<HTMLElement | null>
  onPositionChange?: (id: string, x: number, y: number) => void
  /** Position via parent anchor (About section grid), not section % coords */
  anchored?: boolean
}

function saveOffset(persistKey: string, id: string, x: number, y: number) {
  try {
    const stored = JSON.parse(localStorage.getItem(persistKey) ?? '{}') as Record<
      string,
      { x: number; y: number }
    >
    stored[id] = { x, y }
    localStorage.setItem(persistKey, JSON.stringify(stored))
  } catch {
    /* ignore quota */
  }
}

export function Sticker({
  sticker,
  persistKey,
  layoutMode = 'mess',
  tidyPosition,
  initialPosition,
  dragContainerRef,
  onPositionChange,
  anchored = false,
}: StickerProps) {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const isDecorative = sticker.decorative || !sticker.alt
  const isTidy = layoutMode === 'tidy' && tidyPosition
  const isLink = Boolean(sticker.href)

  const rootRef = useRef<HTMLDivElement>(null)
  const dragged = useRef(false)
  const x = useMotionValue(initialPosition?.x ?? 0)
  const y = useMotionValue(initialPosition?.y ?? 0)

  const rotation = isTidy
    ? (tidyPosition?.rotation ?? 0)
    : (sticker.rotation ?? 0)

  const pos = isTidy
    ? tidyPosition
    : anchored
      ? null
      : {
          x: sticker.x,
          y: sticker.y,
          rotation,
        }

  const baseStyle: CSSProperties = {
    width: 'var(--sticker-size)',
    zIndex: sticker.zIndex ?? 10,
    ...(pos && !anchored
      ? {
          left: `min(${pos.x}%, calc(100% - var(--sticker-size)))`,
          top: `${pos.y}%`,
        }
      : {}),
    ...(isTidy && tidyPosition
      ? {
          left: `min(${tidyPosition.x}%, calc(100% - var(--sticker-size)))`,
          top: `${tidyPosition.y}%`,
        }
      : {}),
  }

  const content = (
    <img
      src={sticker.src}
      alt={isDecorative ? '' : sticker.alt}
      aria-hidden={isDecorative ? true : undefined}
      draggable={false}
      className="sticker__img"
    />
  )

  return (
    <motion.div
      ref={rootRef}
      className={[
        'sticker',
        isTidy ? 'sticker--tidy' : '',
        anchored ? 'sticker--anchored' : '',
        isLink ? 'sticker--link' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={isTidy ? baseStyle : { ...baseStyle, x, y }}
      role={isDecorative ? 'presentation' : undefined}
      title={sticker.hint}
      initial={false}
      animate={{ rotate: rotation }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { rotate: { type: 'spring', stiffness: 140, damping: 20 } }
      }
      drag={!isTidy}
      dragConstraints={anchored ? false : dragContainerRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ zIndex: 200, cursor: 'grabbing' }}
      onDragStart={() => {
        dragged.current = false
      }}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > 3 || Math.abs(info.offset.y) > 3) {
          dragged.current = true
        }
      }}
      onDoubleClick={() => {
        if (dragged.current || !sticker.href) return
        navigate(sticker.href)
      }}
      onDragEnd={() => {
        const px = x.get()
        const py = y.get()
        onPositionChange?.(sticker.id, px, py)
        saveOffset(persistKey, sticker.id, px, py)
        rootRef.current?.blur()
      }}
      data-sticker-id={sticker.id}
    >
      {content}
    </motion.div>
  )
}
