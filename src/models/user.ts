import { UserType } from '@/@types/user';
import UserService, { LoginParams } from '@/api/user';
import { HttpResponse } from '@/@types/api';
import { message } from 'antd';
import { history } from 'umi';
import Cookies from 'js-cookie';
import { Dispatch } from '../.umi/plugin-dva/connect';
import { History } from 'history';
import { noAuthRoutes } from '../config/permission.config';

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

const UserState = {
  namespace: 'user', // 可省略
  state: {
    token: '',
    user: {} as UserType,
  }, // 初始状态：缓存或空数组
  effects: {
    *userLogin(
      action: { payload: LoginParams },
      { call, put }: { call: any; put: any },
    ): any {
      const res = yield call(userLoginAction, action.payload);
      if (res) {
        yield put({
          type: '__set',
          payload: { key: 'token', value: res.data.data.token },
        });
        yield put({
          type: '__set',
          payload: { key: 'user', value: res.data.data.user },
        });
        yield Cookies.set('token', res.data.data.token);
        yield history.push('/home');
        return res;
      }
    },
  },
  reducers: {
    __set(state: any, action: { payload: { key: string; value: any } }) {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
  subscriptions: {
    setup({ history }: { history: History }) {
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

type UserStateType = typeof UserState.state;
export { UserStateType };
export default UserState;
