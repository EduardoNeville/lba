import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Reviewing the site from another device (a phone at 375px, a tablet) happens over
  // the tailnet, where the Host header is a *.ts.net name and Vite's default host
  // check answers 403. Only `dev` and `preview` are affected — Firebase Hosting
  // serves production, and nothing here changes what gets built.
  server: { allowedHosts: ['.ts.net'] },
  preview: { allowedHosts: ['.ts.net'] },
})
