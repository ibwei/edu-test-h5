import './index.module.less';
import { connect } from 'dva';
import { Link } from 'umi';
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
        <h1>路由测试</h1>
        <div className="state">
          <Link to="/me">Me Page</Link>
          <Link to="/test">测试 layout</Link>
          <Link to="/test/index">测试 Dva</Link>
          <Link to="/test/test2">子路由测试</Link>
          <Link to="/tes22t/te33st2/32323">404测试</Link>
        </div>
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
  ...state.app,
});

const actionCreater = {
  changeLanguage: (payload: string) => ({
    type: 'app/changeLanguage',
    payload,
  }),
  changeVersion: (payload: string) => ({ type: 'app/changeVersion', payload }),
  changeState: (payload: { key: string; value: any }) => {
    return {
      type: 'app/__set',
      payload,
    };
  },
  initLanguage: () => {
    return {
      type: 'app/initLanguage',
    };
  },
};

export default connect(mapStatetoprops, actionCreater)(Test);
