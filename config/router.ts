import { defineConfig } from 'umi';
export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/me', component: '@/pages/me/index' },
    {
      path: '/test',
      redirect: '/test/index',
      routes: [
        {
          path: '/index',
          component: '@/pages/test/index',
        },
      ],
    },
    { path: '/hhhahah', component: '@/404/index', exact: false },
    { path: '*', component: '@/404/index', exact: false },
  ],
});
