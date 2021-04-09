import { FunctionComponent } from 'react';
import { QuestionItem } from '../../../@types/question';
import { CheckOutlined } from '@ant-design/icons';
import './QuestionContent.less';
import { useStore, useDispatch, connect } from 'umi';
import { GlobalStateType } from '../../../@types/store';
import { message } from 'antd';
export interface QuestionContentProps {
  index: number;
  currentQuestion: QuestionItem;
  setCurrentQuestionIndex: (number: number) => void;
  finishedMap: Map<number, number>;
  question: any;
}

const QuestionContent: FunctionComponent<QuestionContentProps> = (props) => {
  const { currentQuestion }: { currentQuestion: any } = props;

  console.log(props);

  const store = useStore<GlobalStateType>().getState();

  const dispatch = useDispatch();

  // key 转换列表
  const translate: any = {
    A: 'a_answer',
    B: 'b_answer',
    C: 'c_answer',
    D: 'd_answer',
    E: 'e_answer',
  };

  /**
   * @method 答题过程
   * @param {event} e - 事件委托
   */
  const handleQuestionAnswer = (e: any) => {
    // 如果点击了绑定了 key 的 dom 才会触发事件
    if (e.target.dataset?.key) {
      const newMap = new Map([...props.finishedMap]);
      newMap.set(props.index, Number(e.target.dataset.key));
      dispatch({
        type: 'question/__set',
        payload: { key: 'finishedMap', value: newMap },
      });
      if (props.index < 49) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('done');
          }, 300);
        }).then(() => {
          props.setCurrentQuestionIndex(props.index + 1);
        });
      }
      if (props.question.finishedMap.size === 50) {
        message.info('你已经回答完所有问题了，可以提交了');
      }
    }
  };

  const answerList = Object.keys(translate).map((key, index) => {
    return (
      <div
        className={
          index !== store.question.finishedMap.get(props.index)
            ? `answer-item`
            : 'answer-item answer-item-active'
        }
        key={index}
        data-key={index}
      >
        <span data-key={index}>
          {key}.{currentQuestion[translate[key]]}
        </span>
        {index === store.question.finishedMap.get(props.index) ? (
          <CheckOutlined />
        ) : null}
      </div>
    );
  });

  return (
    <div className="question-content-container">
      <div className="question-title">
        {`${props.index + 1} 【${
          store.question.partList[Math.floor(props.index / 5)]?.name
        }】 ${currentQuestion.title}`}
      </div>
      <div className="answer-box" onClick={handleQuestionAnswer}>
        {answerList}
      </div>
    </div>
  );
};

const mapStateToProps = ({ question }: { question: any }) => {
  return { question: question };
};

export default connect(mapStateToProps)(QuestionContent);
