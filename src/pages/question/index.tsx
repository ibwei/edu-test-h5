import { Button, PageHeader, Spin } from 'antd';
import { history, useStore } from 'umi';
import QuestionSelector from '../components/QuestionSelector/QuestionSelector';
import { GlobalStateType } from '../../@types/store';
import QuestionContent from '../components/QuestionContent/QuestionContent';
import { useState, useEffect } from 'react';
import './index.less';
import QuestionService from '../../api/question';
import { QuestionItem } from '../../@types/question';

export default function QuestionPage() {
  const store = useStore<GlobalStateType>().getState();
  const [loading, setLoading] = useState(true);

  // 试题列表
  const [questionList, setQuestionList] = useState<QuestionItem[]>([]);

  // 当前正在做的题目Id
  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  // 已经做得到了题目Map,key:题号,answer 为答案
  const finishedMap = new Map<number, number>();

  const getQuestionList = async () => {
    try {
      const res = await QuestionService.getTestQuestionList();
      if (res?.status === 200) {
        setQuestionList(() => res.data.data.flat());
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * @event componentDidMount 声明周期
   * @description 获取试题列表,并初始化当前题目为第一道
   */
  useEffect(() => {
    getQuestionList().then(() => {
      setCurrentQuestionId(0);
    });
  }, []);

  return (
    <Spin tip="正在努力加载试题中..." spinning={loading}>
      <div className="question-container">
        <div className="question-header">
          <PageHeader
            style={{
              color: '#fff !important',
              padding: '5px 10px',
            }}
            onBack={() => history.push('/home')}
            title="返回"
            subTitle="正在答题"
          />
        </div>
        <div className="scroll-container">
          <QuestionSelector />
        </div>
        <div className="question-content-panel">
          {!loading ? (
            <QuestionContent
              index={currentQuestionId}
              currentQuestion={questionList[currentQuestionId]}
            />
          ) : null}
        </div>
        <div className="question-operator">
          <Button
            type="default"
            block
            size="large"
            shape="round"

            /*  disabled={!this.state.buttonShow}
              onClick={this.addAnswer.bind(this)} */
          >
            提交
          </Button>
        </div>
      </div>
    </Spin>
  );
}
