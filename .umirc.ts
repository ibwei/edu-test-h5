import { defineConfig } from 'umi';

export default defineConfig({
  base: '/',
  publicPath: '/',
  hash: true,
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
});
