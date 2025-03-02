import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 1000
    },
    hmr: {
      timeout: 10000,
      overlay: true
    }
  },
  optimizeDeps: {
    force: true,
    entries: [
      'src/**/*.{ts,tsx}'
    ]
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'EMPTY_BUNDLE') return;
        warn(warning);
      }
    }
  }
})