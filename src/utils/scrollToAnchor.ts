interface ScrollToAnchorOptions {
  updateHash?: boolean
  behavior?: ScrollBehavior
}

export function scrollToAnchor(
  target: string,
  { updateHash = false, behavior = 'smooth' }: ScrollToAnchorOptions = {},
) {
  const isSelector = target.startsWith('#')
  const element = isSelector
    ? document.querySelector(target)
    : document.getElementById(target)

  element?.scrollIntoView({ behavior, block: 'start' })

  if (updateHash) {
    const hash = isSelector ? target : `#${target}`
    history.replaceState(null, '', hash)
  }
}
