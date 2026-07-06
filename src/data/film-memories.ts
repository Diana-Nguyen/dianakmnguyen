import type { PolaroidSlide } from './types'

import ballard from '../assets/photos/ballard.jpg'
import bellingham from '../assets/photos/bellingham.jpg'
import bird from '../assets/photos/bird.jpg'
import jiro from '../assets/photos/jiro.JPG'
import me from '../assets/photos/me.jpg'
import mt from '../assets/photos/mt.jpg'
import park from '../assets/photos/park.jpg'
import rainier from '../assets/photos/rainier.jpg'
import ren from '../assets/photos/ren.png'
import ruston from '../assets/photos/ruston.jpg'
import sakura from '../assets/photos/sakura.jpg'
import seattle from '../assets/photos/seattle.jpg'

/** Side-quests polaroids — 6 portrait + 6 landscape frames, mixed order */
export const filmMemories: PolaroidSlide[] = [
  {
    id: 'ren',
    label: 'Ren',
    src: ren,
    orientation: 'landscape',
  },
  {
    id: 'jiro',
    label: 'Jiro',
    src: jiro,
    orientation: 'portrait',
  },
  {
    id: 'me',
    label: 'Me!',
    src: me,
    orientation: 'landscape',
  },
  {
    id: 'ballard',
    label: 'Ballard Locks',
    src: ballard,
    orientation: 'portrait',
  },
  {
    id: 'bellingham',
    label: 'Bellingham Boardwalk',
    src: bellingham,
    orientation: 'landscape',
  },
  {
    id: 'seattle',
    label: 'Seattle skyline',
    src: seattle,
    orientation: 'portrait',
  },
  {
    id: 'bird',
    label: 'Bird watching',
    src: bird,
    orientation: 'portrait',
  },
  {
    id: 'mt',
    label: 'Mountain views',
    src: mt,
    orientation: 'landscape',
  },
  {
    id: 'sakura',
    label: 'Sakura season',
    src: sakura,
    orientation: 'portrait',
  },
  {
    id: 'park',
    label: 'Whatcom Falls',
    src: park,
    orientation: 'portrait',
  },
  {
    id: 'rainier',
    label: 'Mt. Rainier',
    src: rainier,
    orientation: 'landscape',
  },
  {
    id: 'ruston',
    label: 'Point Ruston',
    src: ruston,
    orientation: 'landscape',
  },
]
