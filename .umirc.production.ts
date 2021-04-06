import { defineConfig } from 'umi';
import routes from './src/config/routes';
import { PRODUCTION_ENV } from './src/config/env.production';

export default defineConfig({
  title: '学商测试',
  publicPath: '/',
  history: {
    type: 'browser',
  },
  routes,
  define: {
    ENV_CONFIG: PRODUCTION_ENV,
  },
});
