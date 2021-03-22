import { defineConfig } from 'umi';
import routes from './src/config/routes';

export default defineConfig({
  title: 'My Umi Base',
  publicPath: '/',
  history: {
    type: 'browser',
  },
  routes,
});
