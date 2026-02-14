import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // 👈 add this line

export default defineConfig({
  base: "/Jassus-Valentines/",
  plugins: [react(), tailwindcss()],
});