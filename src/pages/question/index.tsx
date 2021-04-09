import { Button, PageHeader, Spin, message } from 'antd';
import { history, useDispatch, connect } from 'umi';
import QuestionSelector from '../components/QuestionSelector/QuestionSelector';
import QuestionContent from '../components/QuestionContent/QuestionContent';
import { useState, useEffect, useMemo, FunctionComponent } from 'react';
import QuestionService from '../../api/question';
import { QuestionItem } from '../../@types/question';
import { QuestionStateType } from '../../models/question';
import './index.less';

interface QuestionPageProps {
  question: QuestionStateType;
}

const QuestionPage: FunctionComponent<QuestionPageProps> = (props) => {
  const { question } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('正在努力加载试题中...');

  // 试题列表
  const [questionList, setQuestionList] = useState<QuestionItem[]>([]);

  // 当前正在做的题目Id
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 答题进度

  const donePercent = useMemo(() => {
    return ((question.finishedMap.size / 50) * 100).toFixed(2);
  }, [question.finishedMap.size]);

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
    if (!question.partList.length) {
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
   * @description  getScore 根绝答案序号获取当前这道题的得分
   * @param  {number} th 题目序号
   * @param  {number} answer 答案序号
   */
  const getScore = (th: number, answer: number): number => {
    const q = questionList[th];
    switch (answer) {
      case 0:
        return q.e_score;
      case 1:
        return q.e_score;
      case 2:
        return q.e_score;
      case 3:
        return q.e_score;
      case 4:
        return q.e_score;
      default:
        return 0;
    }
  };

  /**
   * @method submitTest  提交试题
   * @description 提交试题， 收集 questionArray=>'12-13-14'，answerArray=>'1-2-4-1-2-4'，scoreArray=>'12-14-13-13 ',
   * allScore=>number
   * 1.收集 questionArray，answerArray,scoreArray
   * 2.发起请求，成功便跳转以及处理缓存
   */
  const submitTest = async () => {
    setLoading(true);
    setLoadingText('正在提交答案，请稍等...');
    const questionArray = [];
    const answerArray = [];
    const scoreArray = [];
    let tempArray = []; // 存放每一个part的分数，每个 part 共有 5 个题目
    let i = 0;
    for (const [key, value] of question.finishedMap.entries()) {
      questionArray.push(questionList[key].id);
      answerArray.push(value);
      tempArray.push(getScore(key, value));
      if (tempArray.length === 5) {
        const sum = tempArray.reduce((a, b) => {
          return a + b;
        }, 0);
        scoreArray.push(sum);
        tempArray = [];
      }
    }
    const allScore = scoreArray.reduce((a, b) => a + b, 0);
    // 开始发起提交请求

    try {
      const res = await QuestionService.submitTest({
        scoreArray: scoreArray.join('-'),
        answerArray: answerArray.join('-'),
        questionArray: questionArray.join('-'),
        allScore: allScore,
      });
      if (res?.status === 200) {
        dispatch({
          type: 'question/__set',
          payload: { key: 'finishedList', value: new Map() },
        });
        message.success('答案提交成功！');
        history.push('/analysis/list');
      }
    } finally {
      setLoading(false);
      setLoadingText('正在努力加载试题中...');
    }
  };

  return (
    <Spin tip={loadingText} spinning={loading}>
      <div className="question-container">
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
              finishedMap={question.finishedMap}
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
            disabled={question.finishedMap.size !== 50}
            onClick={submitTest}
          >
            提交
          </Button>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = ({ question }: { question: QuestionStateType }) => {
  return { question };
};

export default connect(mapStateToProps)(QuestionPage);
