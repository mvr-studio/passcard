import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/main.ts'],
    outDir: './dist',
    format: 'cjs',
    clean: true,
    bundle: true
  }
])
