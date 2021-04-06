import { IRoute } from 'umi';

const routes: IRoute[] = [
  { path: '/', component: '@/pages/home/index' },
  { path: '/home', component: '@/pages/home/index', exact: true },
  { path: '/question', component: '@/pages/question/index', exact: true },
  { path: '/me', component: '@/pages/me/index' },
  {
    path: '/test',
    component: '@/layouts/index',
    routes: [
      { path: '/test', redirect: '/test/index' },
      {
        exact: true,
        path: '/test/index',
        component: '@/pages/test/index',
      },
    ],
  },
  { path: '/hhhahah', component: '@/pages/404/index' },
  { path: '*', component: '@/pages/404/index' },
];

export default routes;
