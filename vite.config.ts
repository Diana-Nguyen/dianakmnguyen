import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'spa-404',
      closeBundle() {
        const out = join(__dirname, 'dist')
        copyFileSync(join(out, 'index.html'), join(out, '404.html'))
      },
    },
  ],
})
