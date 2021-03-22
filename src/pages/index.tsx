import { Link } from 'umi';
import './index.less';

export default function IndexPage(props: any) {
  console.log(props.routes);
  return (
    <div className="app-container">
      <h1 className="title">Page index</h1>
      <Link to="/me">Me Page</Link>
      <Link to="/test">测试 layout</Link>
      <Link to="/test/index">测试 Dva</Link>
      <Link to="/test/test2">子路由测试</Link>
      <Link to="/tes22t/te33st2/32323">404测试</Link>
    </div>
  );
}
