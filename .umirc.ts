import { PRODUCTION_ENV } from './src/config/env.production';
import { DEVELOPMENT_ENV } from './src/config/env.development';
import { defineConfig } from 'umi';
import routes from './src/config/routes';

export default defineConfig({
  title: '学商测试',
  publicPath: '/',
  history: {
    type: 'browser',
  },
  routes,
  define: {
    ENV_CONFIG: DEVELOPMENT_ENV,
  },
  proxy: {
    '/api': {
      target: PRODUCTION_ENV.baseUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
