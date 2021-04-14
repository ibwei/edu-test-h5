import { message } from 'antd';
import Cookies from 'js-cookie';
import { noAuthRoutes } from '../config/permission.config';
import { NModel } from '../@types/store';
import QuestionService from '../api/question';
import { PartItem } from '../@types/question';

const getPartList = async () => {
  const res = await QuestionService.getPartList();
  if (res?.status == 200) {
    if (res.data.resultCode === 0) {
      return res;
    }
  }
  return 0;
};

export type QuestionStateType = {
  finishedMap: Map<number, number>;
  partList: PartItem[];
};

const UserState: NModel<QuestionStateType> = {
  namespace: 'question', // 可省略
  state: {
    finishedMap: new Map(),
    partList: [], // 初始状态：缓存或空数组
  },
  effects: {
    *getPartList({}, { call, put }) {
      const res = yield call(getPartList);
      if (res) {
        yield put({
          type: '__set',
          payload: { key: 'partList', value: res.data.data },
        });
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
};

export default UserState;
