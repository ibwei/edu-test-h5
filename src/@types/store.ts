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
