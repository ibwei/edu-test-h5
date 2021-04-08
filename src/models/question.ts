import { message } from 'antd';
import Cookies from 'js-cookie';
import { History } from 'history';
import { noAuthRoutes } from '../config/permission.config';
import { NModel } from '../@types/store';

export type QuestionStateType = {
  finishedMap: Map<number, number>;
  partList: any[];
};

const UserState: NModel<QuestionStateType> = {
  namespace: 'question', // 可省略
  state: {
    finishedMap: new Map(),
    partList: [],
  }, // 初始状态：缓存或空数组
  effects: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    __set(state: any, { payload }) {
      const { key, value } = payload;
      return { ...state, [key]: value };
    },
  },
  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname }) => {
        if (!noAuthRoutes.includes(pathname)) {
          const isLogin = Cookies.get('token');
          if (!isLogin) {
            message.info('请先登录');
            history.push('/user/login');
          }
        }
      });
    },
  },
};

export default UserState;
