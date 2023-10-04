import million from 'million/compiler';
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: nodejs(),
  integrations: [react()],
  /*   vite: {
      plugins: [million.vite({ mode: 'react', server: true, auto: true })]
    } */
});