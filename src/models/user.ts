import { UserType } from '@/@types/user';
import UserService, { LoginParams } from '@/api/user';
import { HttpResponse } from '@/@types/api';
import { message } from 'antd';
import { Effect, history, Reducer, Subscription } from 'umi';
import Cookies from 'js-cookie';
import { History } from 'history';
import { noAuthRoutes } from '../config/permission.config';

type UserStateType = {
  token: string;
  user: UserType;
};
export interface IUserModel {
  namespace: 'user';
  state: UserStateType;
  effects: {
    // 获取当前用户信息
    userLogin: Effect;
  };
  reducers: {
    save: Reducer<UserStateType>;
    __set: Reducer<UserStateType>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

// 用户登录
const userLoginAction = async (
  form: LoginParams,
): Promise<HttpResponse<UserStateType>> => {
  const res = await UserService.login({
    username: form.username,
    password: form.password,
  });
  if (res?.status === 200) {
    if (res.data.resultCode === 0) {
      message.success(res.data.resultMessage);
      return res;
    }
  }
  return res;
};

const UserState: IUserModel = {
  namespace: 'user', // 可省略
  state: {
    token: '',
    user: {} as UserType,
  }, // 初始状态：缓存或空数组
  effects: {
    *userLogin({ payload }, { call, put }: { call: any; put: any }): any {
      const res = yield call(userLoginAction, payload.data);
      if (res) {
        yield put({
          type: '__set',
          payload: { key: 'token', value: res.data.data.token },
        });
        yield put({
          type: '__set',
          payload: { key: 'user', value: res.data.data.user },
        });
        const { resolve } = payload;
        resolve(res);
      }
    },
  },
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
    setup({ history }: { history: History }) {
      return history.listen(({ pathname }) => {
        if (!noAuthRoutes.includes(pathname)) {
          console.log('pathname', pathname);
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

export { UserStateType };
export default UserState;
