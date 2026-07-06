import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const pdfDist = join(root, 'node_modules', 'pdfjs-dist', 'build')
const publicDir = join(root, 'public')

copyFileSync(join(pdfDist, 'pdf.mjs'), join(publicDir, 'pdf.mjs'))
copyFileSync(join(pdfDist, 'pdf.worker.min.mjs'), join(publicDir, 'pdf.worker.min.mjs'))
