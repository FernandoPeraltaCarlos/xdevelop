import million from 'million/compiler';
import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: nodejs({
    mode: 'standalone',
  }),
  integrations: [react()],
  /*   vite: {
      plugins: [million.vite({ mode: 'react', server: true, auto: true })]
    } */
});