import './index.module.less';
import { connect } from 'dva';
import { Link } from 'umi';
import useToggle from '../../utils/useHooks/useToggle';
import { useEffect, useMemo, useState, useCallback } from 'react';
export interface TestProps {
  routes: any;
}

const TestChild = (props: any) => {
  const { toggle, changeToggle } = useToggle();
  let i = 0;
  useEffect(() => {
    console.log('child componentDidMount');
    console.log(changeToggle === props.changeToggle);
    console.log(changeToggle, props.changeToggle);
    return () => {
      console.log('child componentWillUnmount...');
    };
  }, []);
  // useCallBack === vue 的 watch
  // useMemo === vue 的 computed
  const memoSum = useMemo(() => {
    const i = props.i;
    console.log('i is chaning', i);
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += j;
    }
    console.log('exspensive=', sum);
    return sum;
  }, [props.i]);

  const memoCallBack = useCallback(() => {
    console.log('watching is called', props.i);
    return 'memo-result' + props.i;
  }, [props.i]);

  return (
    <div>
      <p>I am the children</p>
      <p>memosuM={memoSum}</p>
      <p>memoCallBackResult={memoCallBack()}</p>

      <button onClick={() => changeToggle()}>unmount myself</button>
    </div>
  );
};

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

  const { toggle, changeToggle } = useToggle();
  const [i, setI] = useState(1);
  const [title, setTitle] = useState('欢迎来到测试页面');

  useEffect(() => {
    console.log('parent componentWillMount');
    return () => {
      console.log('parent componentWillUnMount');
    };
  });

  useMemo(() => setTitle(`再次欢迎${i}`), [i]);

  return (
    <>
      <div className="test">
        <h1>{title}</h1>
        <button
          onClick={() => {
            setI(() => 1111);
          }}
        >
          修改标题
        </button>
        <TestChild i={i} changeToggle={changeToggle} />
        {toggle ? <h1>路由测试</h1> : <h2>is hide</h2>}
        <button
          onClick={() => {
            changeToggle();
          }}
        >
          changeToggle
        </button>
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
