import { defineConfig } from 'umi';
import routes from './src/config/routes';

export default defineConfig({
  publicPath: '/',
  history: {
    type: 'browser',
  },
  routes,
});
