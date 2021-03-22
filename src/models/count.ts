/* 作演示之用 */
function asyncInit(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
}
export default {
  namespace: 'count', // 可省略
  state: JSON.parse(localStorage.getItem('count') as string) || 99, // 初始状态：缓存或空数组

  effects: {
    // generactor 这玩意还再用，我也是醉了
    //这个执行异步操作，这玩意是* 生成器函数？？
    *init(action: any, { call, put }: { call: Function; put: Function }) {
      let payload: number = yield call(asyncInit);
      yield put({ type: 'setCount', payload });
    },
  },
  reducers: {
    add(state: any, action: any) {
      return state + action.payload;
    },
    minus(state: any, action: any) {
      return state - action.payload;
    },
    setCount(state: any, action: any) {
      state = action.payload;
      return state;
    },
  },
};
