import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/server.ts'],
    format: 'esm',
    outDir: './dist',
    clean: true
  }
])
