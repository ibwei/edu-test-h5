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
  theme: {
    '@primary-color': '#798EDF',
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      hack: `true; @import "~@/assets/css/theme/default.less";`,
    },
  },
  proxy: {
    '/api': {
      target: PRODUCTION_ENV.baseUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
