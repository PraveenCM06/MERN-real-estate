import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
              target:'http://localhost:3000',
              secure: false,
        },
        //each time we use /api,  http://localhost:3000 will be automatically added before it
    },
  },
  plugins: [react()],
})
