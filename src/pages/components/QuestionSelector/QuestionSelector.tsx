import { FunctionComponent } from 'react';
import { Progress } from 'antd';
import './QuestionSelecotr.less';
import Circle from '../Circle/Circle';

export interface QuestionSelectorProps {
  percent: number;
  current: number;
  setCurrentQuestionIndex: (number: number) => void;
}

const QuestionSelector: FunctionComponent<QuestionSelectorProps> = (props) => {
  const { setCurrentQuestionIndex, percent } = props;

  const list = new Array(50).fill(0);

  // 题目序号列表
  const circleList = list.map((n, i) => {
    return (
      <div style={{ marginRight: '10px' }} key={i}>
        <Circle currentId={props.current} id={i} />
      </div>
    );
  });

  /**
   * @method 手动选择题目
   * @param {event} e - 事件委托,切换题目的序号为 e.target.dataset.index
   */

  const changeQuestion = (e: any) => {
    if (e.target.dataset.key) {
      console.log('e', e.target.dataset.key);
      setCurrentQuestionIndex(Number(e.target.dataset.key));
    }
  };

  return (
    <div className="question-selector">
      <div className="progrees">
        <Progress
          trailColor="#8DA0EE"
          strokeColor="#A0B1F1"
          showInfo={false}
          percent={percent}
        />
      </div>
      <div className="question-scroll-container" onClick={changeQuestion}>
        {circleList}
      </div>
    </div>
  );
};

export default QuestionSelector;
