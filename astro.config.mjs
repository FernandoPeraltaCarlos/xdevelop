import million from 'million/compiler';
import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()]
  /*   vite: {
      plugins: [million.vite({ mode: 'react', server: true, auto: true })]
    } */
});