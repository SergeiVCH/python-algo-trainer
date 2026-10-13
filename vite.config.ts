import {defineConfig} from 'vite'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({presets: [reactCompilerPreset()]}),
    Icons({
      compiler: 'jsx', // Указываем, что работаем с React
      autoInstall: true, // Автоматически доставит нужные наборы
    }),
  ],
})
