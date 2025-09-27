import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SUBFOLDER_NAME } from './src/Components/Common/https';



export default defineConfig({
  plugins: [react()],
  base: SUBFOLDER_NAME, // ab yeh "/" hoga
});
