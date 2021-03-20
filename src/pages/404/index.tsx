import './404.less';
export interface NotFoundPageProps {}

const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <div className="not-found">
      <h1 className="no-text">404 Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
