function asyncInit(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('zhCN');
    }, 1000);
  });
}
export default {
  namespace: 'app', // 可省略
  state: {
    language: 'zhCN',
    theme: 'light',
    version: '0.0.1',
    fullLoading: false,
    loadingText: 'Loading...',
    currentActiveNav: '解决方案',
  }, // 初始状态：缓存或空数组

  effects: {
    // generactor 这玩意还再用，我也是醉了
    //这个执行异步操作，这玩意是* 生成器函数？？
    *initLanguage(
      action: any,
      { call, put }: { call: Function; put: Function },
    ) {
      let payload: string = yield call(asyncInit);
      yield put({ type: 'changeLanguage', payload });
    },
  },
  reducers: {
    __set(state: any, action: { payload: { key: string; value: any } }) {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
    changeLanguage(state: any, action: any) {
      return { ...state, language: action.payload };
    },
    changeVersion(state: any, action: any) {
      return { ...state, version: action.payload };
    },
    changeTheme(state: any, action: any) {
      return { ...state, theme: action.payload };
    },
  },
};
