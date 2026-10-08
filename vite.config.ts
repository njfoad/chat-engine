import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode }) => {
  // BUILD TARGET 1: Standalone IIFE Bundle (Bundles React inside)
  if (mode === 'standalone') {
    return {
      plugins: [react()],
      build: {
        emptyOutDir: false, // Don't wipe dist folder
        lib: {
          entry: path.resolve(__dirname, 'src/standalone.tsx'),
          name: 'AvayaChatEngine',
          fileName: () => 'avaya-chat-engine.min.js',
          formats: ['iife']
        }
      }
    };
  }

  // BUILD TARGET 2: Default ESM/CJS React Library (Externalizes React for NPM)
  return {
    plugins: [
      react(),
      dts({ tsconfigPath: './tsconfig.app.json', insertTypesEntry: true }) // Generates .d.ts type files
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'ChatEngine',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        // Crucial: Keep React external for React consumers so you don't duplicate React in their node_modules
        external: ['react', 'react-dom', 'react/jsx-runtime']
      }
    }
  };
});