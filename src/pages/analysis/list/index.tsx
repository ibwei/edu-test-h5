import { FunctionComponent, useState, useEffect } from 'react';
import UserService from '@/api/user';
import { List } from 'antd';
import './index.less';

export interface Props {}

const AnalysisListPage: FunctionComponent<Props> = (props) => {
  const listItem = {
    id: 0,
    name: '',
    a_answer: '',
    b_answer: '',
    c_answer: '',
    d_answer: '',
    order: 0,
    created_at: '0',
  };

  type ListItem = typeof listItem;

  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [historyList, setHistoryList] = useState<ListItem[]>([]);

  // 获取表单函数
  const getList = async () => {
    UserService.submitHistory({
      pageSize,
      pageNum,
    }).then((res) => {
      if (res?.status === 200) {
        setHistoryList((list) => [...list, ...res.data.data]);
      }
    });
  };

  // 获取
  useEffect(() => {
    getList();
  }, [pageSize, pageNum]);

  return (
    <div className="analysis-list-bg">
      <List></List>
      {historyList.length == 0 && <div className="noList">暂无测试结果</div>}
    </div>
  );
};

export default AnalysisListPage;
