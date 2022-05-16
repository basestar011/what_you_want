import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'WDYW');
  /** index.html 로드 시 env 파일에서 title을 replace해주는 함수 */
  const htmlPlugin = () => {
      return {
          name: "html-transform",
          transformIndexHtml(html) {
              return html.replace(/%(.*?)%/g, (match, p1) => env[p1]);
          },
      };
  };

  return {
    plugins: [vue(), htmlPlugin()],
    envPrefix: 'WDYW',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
})
