import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		strictPort: true
	},
  base: '/app/',
  build: {
    outDir: '../src/main/resources/static/app',
    emptyOutDir: true,
  }
});


