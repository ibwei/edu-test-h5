import { Button, PageHeader, Spin } from 'antd';
import { history, useStore, useDispatch } from 'umi';
import QuestionSelector from '../components/QuestionSelector/QuestionSelector';
import { GlobalStateType } from '../../@types/store';
import QuestionContent from '../components/QuestionContent/QuestionContent';
import { useState, useEffect, useMemo } from 'react';
import QuestionService from '../../api/question';
import { QuestionItem } from '../../@types/question';
import './index.less';

export default function QuestionPage() {
  const store = useStore<GlobalStateType>().getState();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // 试题列表
  const [questionList, setQuestionList] = useState<QuestionItem[]>([]);

  // 当前正在做的题目Id
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 答题进度

  const donePercent = useMemo(() => {
    return ((store.question.finishedMap.size / 50) * 100).toFixed(2);
  }, [store.question.finishedMap.size]);

  // 已经做得到了题目Map,key:题号,answer 为答案

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
    // 没有试题分类列表，先获取分类列表
    if (!store.question.partList.length) {
      dispatch({
        type: 'question/getPartList',
      });
    }
    // 获取试题列表
    getQuestionList().then(() => {
      setCurrentQuestionIndex(0);
    });
  }, []);

  /**
   * @method  提交实体
   * @description 提交试题
   */
  const submitTest = () => {};

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
          <QuestionSelector
            percent={Number(donePercent)}
            current={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        </div>
        <div className="question-content-panel">
          {!loading ? (
            <QuestionContent
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              index={currentQuestionIndex}
              finishedMap={store.question.finishedMap}
              currentQuestion={questionList[currentQuestionIndex]}
            />
          ) : null}
        </div>
        <div className="question-operator">
          <Button
            type="default"
            block
            size="large"
            shape="round"
            disabled={store.question.finishedMap.size !== 50}
            onClick={submitTest}
          >
            提交
          </Button>
        </div>
      </div>
    </Spin>
  );
}
