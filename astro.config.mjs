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
  server: {
    allowedHosts: [
      'fd62-2806-10a6-16-cb2c-fd5a-8279-3806-17cb.ngrok-free.app',
      // You can also use a wildcard to allow all ngrok subdomains:
      // '.ngrok-free.app'
    ]
  }
});
