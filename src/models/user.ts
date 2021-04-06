import { UserType } from '@/@types/user';
import UserService, { LoginParams } from '@/api/user';
import { HttpResponse } from '@/@types/api';
import { message } from 'antd';
import { history } from 'umi';

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
      history.push('/home');
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
      console.log('🚀 ~ file: user.ts ~ line 33 ~ res', res);
      if (res) {
        yield put({
          type: '__set',
          payload: { key: 'token', value: res.data.data.token },
        });
        yield put({
          type: '__set',
          payload: { key: 'user', value: res.data.data.user },
        });
      }
    },
  },
  reducers: {
    __set(state: any, action: { payload: { key: string; value: any } }) {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
};

type UserStateType = typeof UserState.state;
export { UserStateType };
export default UserState;
