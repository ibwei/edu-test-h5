import { FunctionComponent, useState, useEffect } from 'react';
import UserService from '@/api/user';
import { List, Spin, PageHeader, Avatar } from 'antd';
import { history } from 'umi';
import { RightOutlined, SnippetsOutlined } from '@ant-design/icons';
import './index.less';
import { HistoryItem } from '@/@types/question';
export interface Props {}

const AnalysisListPage: FunctionComponent<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('正在努力加载试题中...');

  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  // 获取表单函数
  const getList = async () => {
    UserService.submitHistory({
      pageSize,
      pageNum,
    }).then((res) => {
      if (res?.status === 200) {
        setHistoryList((list) => [...list, ...res.data.data]);
        setLoading(false);
      }
    });
  };

  // 获取
  useEffect(() => {
    getList();
  }, [pageSize, pageNum]);

  const navToAnalysis = (item: HistoryItem) => {
    console.log(item);
    history.push({
      pathname: `/analysis/result`,
      query: { scoreInfo: JSON.stringify(item) },
    });
  };

  return (
    <Spin tip={loadingText} spinning={loading}>
      <div className="analysis-list-bg">
        <div className="question-header">
          <PageHeader
            style={{
              color: '#fff !important',
              padding: '5px 10px',
            }}
            onBack={() => history.push('/home')}
            title={
              <span
                onClick={() => {
                  history.push('/home');
                }}
              >
                返回{' '}
              </span>
            }
            subTitle="提交历史"
          />
        </div>

        <List
          itemLayout="horizontal"
          dataSource={historyList}
          style={{ borderBottom: '1px solid #ccc' }}
          renderItem={(item, index) => (
            <List.Item
              key={item.created_at}
              onClick={() => navToAnalysis(item)}
              className="analysis-list-item analysis-list-item-border"
            >
              <List.Item.Meta
                className="analysis-list-item"
                avatar={<Avatar icon={<SnippetsOutlined />} />}
                title={<span>{`第${index + 1}次学商测试`}</span>}
                description={<span className="time">{item.created_at}</span>}
              />
              <div>
                <RightOutlined />
              </div>
            </List.Item>
          )}
        ></List>
        {historyList.length == 0 && <div className="noList">暂无测试结果</div>}
      </div>
    </Spin>
  );
};

export default AnalysisListPage;
