import { QuestionStateType } from '@/models/question';
import { EffectsCommandMap, SubscriptionsMapObject } from 'dva';
import { Subscription, UserStateType } from 'umi';
// 跟 dva 模块相关
type ModuleName = 'app' | 'user';

// 统一封装一层便捷触发 reducer 的函数
const dispatchReducer = <T>(
  module: keyof ModuleName,
  key: keyof T,
  value: any,
) => ({
  type: `${module}/__set`,
  payload: { key, value },
});

const actionCreater = {
  dispatchReducer,
};

export { actionCreater };

export interface NModel<S> {
  namespace: string;
  state?: S;
  reducers?: {
    [key: string]: (state: S, action: any) => void;
  };
  effects?: {
    [key: string]: (action: any, effects: EffectsCommandMap) => void;
  };
  subscriptions?: SubscriptionsMapObject;
}

export interface GlobalStateType {
  user: UserStateType;
  question: QuestionStateType;
}
