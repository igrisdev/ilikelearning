/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      'light',
      {
        dark: {
          'base-100': '#1e1e1e',
          'base-200': '#2a2a2a',
          'base-300': '#363636',
        },
      },
    ],
  },
}
