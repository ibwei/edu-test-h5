import { Link } from 'umi';
import './index.less';

export default function IndexPage(props: any) {
  console.log(props.routes);
  return (
    <div className="app-container">
      <h1 className="title">Page index</h1>
      <Link to="/me">me Page</Link>
      <Link to="/test">test Page</Link>
      <Link to="/test/index">test index Page</Link>
      <Link to="/test/test2">test test2 Page</Link>
      <div>test2</div>
    </div>
  );
}
