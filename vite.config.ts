import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Repository name on GitHub — used as the base path for GitHub Pages.
// The site will be served at: https://<username>.github.io/<REPO_NAME>/
const REPO_NAME = 'abhishek-viswanathan';

export default defineConfig(() => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  return {
    // Set base to the repo name when building for GitHub Pages so that all
    // asset URLs are prefixed correctly (e.g. /repo-name/assets/...).
    base: isGitHubPages ? `/${REPO_NAME}/` : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Inject environment variables into the client bundle at build time.
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
        process.env.GEMINI_API_KEY ?? process.env.VITE_GEMINI_API_KEY ?? ''
      ),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
