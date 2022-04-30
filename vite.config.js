import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 기본 .env 로드
const env = loadEnv(/*mode*/null, process.cwd(), "WDYW");
const htmlPlugin = () => {
    return {
        name: "html-transform",
        transformIndexHtml(html) {
            return html.replace(/%(.*?)%/g, (match, p1) => env[p1]);
        },
    };
};

export default defineConfig({
  plugins: [vue(), htmlPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envPrefix: 'WDYW'
})
