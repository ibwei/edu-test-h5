import './index.module.less';
import { connect } from 'dva';
export interface TestProps {
  routes: any;
}

const Test = (props: any) => {
  const {
    language,
    theme,
    version,
    changeLanguage,
    changeVersion,
    changeState,
    initLanguage,
  } = props;
  return (
    <>
      <div className="test">
        <h1>Test For Dva</h1>
        <div className="state">
          <span>language:{language}</span>
          <span>version:{version}</span>
          <span>theme:{theme}</span>
        </div>
        <div className="operate">
          <button onClick={() => changeLanguage('en')}>改变语言</button>
          <button onClick={() => changeVersion('en')}>改变版本</button>
          <button onClick={() => initLanguage()}>异步初始化语言</button>
          <button onClick={() => changeState({ key: 'theme', value: 'dark' })}>
            通过通用 reduce 更改 theme
          </button>
        </div>
      </div>
      <div className="router">{props.children}</div>
    </>
  );
};

const mapStatetoprops = (state: any) => ({
  ...state.user,
});

const actionCreater = {
  changeLanguage: (payload: string) => ({
    type: 'user/changeLanguage',
    payload,
  }),
  changeVersion: (payload: string) => ({ type: 'user/changeVersion', payload }),
  changeState: (payload: { key: string; value: any }) => {
    return {
      type: 'user/__set',
      payload,
    };
  },
  initLanguage: () => {
    return {
      type: 'user/initLanguage',
    };
  },
};

export default connect(mapStatetoprops, actionCreater)(Test);
