import { Router } from 'react-router';
import { IRoute } from 'umi';

const routes: IRoute[] = [
  { path: '/', component: '@/pages/index' },
  { path: '/me', component: '@/pages/me/index' },
  {
    path: '/test/',
    component: '@/layouts/index',
    routes: [
      {
        exact: true,
        path: 'index',
        component: '@/pages/test/index',
      },
      {
        exact: true,
        path: 'test2',
        component: '@/pages/test2/index',
      },
    ],
  },
  { path: '/hhhahah', component: '@/pages/404/index' },
  { path: '*', component: '@/pages/404/index' },
];

export default routes;
