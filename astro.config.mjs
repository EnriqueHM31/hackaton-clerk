import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // IMPORTANTE: sin llaves, es default export
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import { dark } from '@clerk/themes';
import { esES } from '@clerk/localizations';
import node from '@astrojs/node';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),   // <--- agregar React aquí
    clerk({
      appearance: {
        baseTheme: dark,
      },
      localization: esES,
    }),
  ],
  adapter: node({ mode: 'standalone' }), // 👈 agregar `mode`
  output: 'server',
});
