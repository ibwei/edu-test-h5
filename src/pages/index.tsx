import { Link } from 'umi';
import './index.less';

export default function IndexPage(props: any) {
  console.log(props.routes);
  return (
    <div className="app-container">
      <h1 className="title">Page index</h1>
    </div>
  );
}
