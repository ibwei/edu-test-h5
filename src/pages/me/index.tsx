import { connect } from 'dva';
function IndexPage(props: any) {
  const { add, minus, init, count } = props;
  return (
    <div>
      <button onClick={() => add(1)}>增加 1</button>
      <button onClick={() => minus(1)}>减少 1</button>
      <button onClick={() => init()}>init</button>
      state={count}
    </div>
  );
}

const mapStatetoprops = (state: any) => ({
  count: state.count,
});

const actionCreater = {
  add: (payload: number) => ({ type: 'count/add', payload }),
  minus: (payload: number) => ({ type: 'count/minus', payload }),
  init: (payload: number) => {
    return {
      type: 'count/init',
      payload,
    };
  },
};

export default connect(mapStatetoprops, actionCreater)(IndexPage);
