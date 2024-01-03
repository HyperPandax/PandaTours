import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'JS/panda-tours-main.js'),
      name: 'PandaTours',
      // the proper extensions will be added
      fileName: 'panda-tours',
    },
  },
})