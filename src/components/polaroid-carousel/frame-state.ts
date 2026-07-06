export type FrameState = 'active' | 'peek' | 'off'

export function getFrameState(
  index: number,
  pageStart: number,
  perPage: number,
  slideCount: number,
): FrameState {
  const activeCount = Math.min(perPage, slideCount - pageStart)

  for (let offset = 0; offset < activeCount; offset += 1) {
    if (index === pageStart + offset) return 'active'
  }

  const peekBefore = pageStart === 0 ? slideCount - 1 : pageStart - 1
  const peekAfter =
    pageStart + activeCount < slideCount ? pageStart + activeCount : 0

  if (index === peekBefore || index === peekAfter) return 'peek'

  return 'off'
}
