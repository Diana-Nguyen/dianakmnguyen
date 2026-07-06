import type { StickerConfig } from './types'

import adobe from '../assets/stickers/adobe.png'
import blender from '../assets/stickers/blender.png'
import camera from '../assets/stickers/camera.png'
import dnd from '../assets/stickers/dnd.png'
import figma from '../assets/stickers/figma.png'
import fish from '../assets/stickers/fish.png'
import gamer from '../assets/stickers/gamer.png'
import markers from '../assets/stickers/markers.png'
import nmixx from '../assets/stickers/nmixx.png'
import pkmnCard from '../assets/stickers/pkmn_card.png'
import pompom from '../assets/stickers/pompom.png'
import reactSticker from '../assets/stickers/react.png'
import tama from '../assets/stickers/tama.png'
import unity from '../assets/stickers/unity.png'
import vscode from '../assets/stickers/vscode.png'

/** Mess-mode defaults: hero/work/side-quests use section % coords; about x/y are pixel offsets from CSS anchors. */
export const stickers: StickerConfig[] = [
  {
    id: 'pompom-hero',
    section: 'hero',
    src: pompom,
    alt: 'Pompompurin sticker',
    x: 11,
    y: 16,
    rotation: -12,
    zIndex: 12,
  },
  {
    id: 'tama-hero',
    section: 'hero',
    src: tama,
    alt: 'Tamagotchi sticker',
    x: 75,
    y: 13,
    rotation: 8,
    zIndex: 14,
  },
  {
    id: 'camera-hero',
    section: 'hero',
    src: camera,
    alt: 'Camera sticker',
    x: 61,
    y: 33,
    rotation: -5,
    zIndex: 11,
  },
  {
    id: 'pkmn-hero',
    section: 'hero',
    src: pkmnCard,
    alt: 'Pokémon card sticker',
    x: 28,
    y: 35,
    rotation: 15,
    zIndex: 15,
    href: '/cards',
    hint: 'Double-click to view collection',
  },
  {
    id: 'dnd-hero',
    section: 'hero',
    src: dnd,
    alt: 'Delicious in Dungeon sticker',
    x: 86,
    y: 34,
    rotation: -18,
    zIndex: 13,
  },
  {
    id: 'fish-hero',
    section: 'hero',
    src: fish,
    alt: '',
    decorative: true,
    x: 41,
    y: 14,
    rotation: -8,
    zIndex: 10,
  },
  {
    id: 'figma-about',
    section: 'about',
    src: figma,
    alt: 'Figma',
    x: 0,
    y: 0,
    rotation: 11,
    zIndex: 14,
  },
  {
    id: 'adobe-about',
    section: 'about',
    src: adobe,
    alt: 'Adobe Creative Cloud',
    x: 0,
    y: 0,
    rotation: 12,
    zIndex: 15,
  },
  {
    id: 'react-about',
    section: 'about',
    src: reactSticker,
    alt: 'React',
    x: 0,
    y: 0,
    rotation: -12,
    zIndex: 12,
  },
  {
    id: 'vscode-work',
    section: 'work',
    src: vscode,
    alt: 'Visual Studio Code',
    x: 88,
    y: 40,
    rotation: -10,
    zIndex: 14,
  },
  {
    id: 'blender-work',
    section: 'work',
    src: blender,
    alt: 'Blender',
    x: 63,
    y: 10,
    rotation: 6,
    zIndex: 13,
  },
  {
    id: 'unity-work',
    section: 'work',
    src: unity,
    alt: 'Unity',
    x: 11,
    y: 68,
    rotation: -5,
    zIndex: 12,
  },
  {
    id: 'gamer-side-quests',
    section: 'side-quests',
    src: gamer,
    alt: 'Game controller sticker',
    x: 62,
    y: 2,
    rotation: 10,
    zIndex: 14,
  },
  {
    id: 'markers-side-quests',
    section: 'side-quests',
    src: markers,
    alt: '',
    decorative: true,
    x: 82,
    y: 49,
    rotation: 5,
    zIndex: 10,
  },
  {
    id: 'nmixx-side-quests',
    section: 'side-quests',
    src: nmixx,
    alt: 'NMIXX album sticker',
    x: 8,
    y: 47,
    rotation: -10,
    zIndex: 13,
  },
]
