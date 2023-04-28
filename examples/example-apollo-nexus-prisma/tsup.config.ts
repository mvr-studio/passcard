import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/server.ts'],
    outDir: './dist',
    format: 'esm',
    clean: true
  }
])
