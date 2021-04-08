import { IRoute } from 'umi';

const routes: IRoute[] = [
  { path: '/', component: '@/pages/home/index' },
  { path: '/home', component: '@/pages/home/index', exact: true },
  {
    path: '/user',
    component: '@/pages/user/index',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: '@/pages/user/login/index' },
    ],
  },
  {
    path: '/analysis',
    component: '@/pages/analysis/index',
    routes: [
      { path: '/analysis', redirect: '/analysis/list' },
      { path: '/analysis/list', component: '@/pages/analysis/list/index' },
      { path: '/analysis', component: '@/pages/analysis/result/index' },
    ],
  },
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
