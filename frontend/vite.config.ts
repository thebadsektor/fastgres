import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    headers: {
      // Temporarily allow 'unsafe-inline' for inline scripts in development
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
    }
  },
  esbuild: {
    legalComments: 'none', // Minimizes comments that could trigger CSP issues
  },
  build: {
    minify: 'terser', // Use terser to minimize eval usage
    rollupOptions: {
      output: {
        format: 'esm', // Uses ES module format to reduce eval reliance
        sourcemap: false // Disables sourcemaps to avoid inline scripts
      }
    }
  }
})
