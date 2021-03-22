import { Result, Button } from 'antd';
import './404.less';

export interface NotFoundPageProps {}

const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <div className="not-found">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
