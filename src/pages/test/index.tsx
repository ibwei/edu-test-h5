import './index.module.less';
export interface TestProps {
  routes: any;
}

const Test: React.SFC<TestProps> = (props) => {
  console.log(props.routes);
  return (
    <>
      <div className="test">111Test</div>
      <div className="router">{props.children}</div>
    </>
  );
};

export default Test;
