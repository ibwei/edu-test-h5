import { FunctionComponent } from 'react';
import { Progress } from 'antd';
import './QuestionSelecotr.less';
import { useState } from 'react';
import Circle from '../Circle/Circle';

export interface QuestionSelectorProps {}

const QuestionSelector: FunctionComponent<QuestionSelectorProps> = () => {
  const [current, setCurrent] = useState(4);
  const list = new Array(50).fill(0);

  // 题目序号列表
  const circleList = list.map((n, i) => {
    return (
      <div style={{ marginRight: '10px' }} key={i}>
        <Circle currentId={current} id={i} />
      </div>
    );
  });

  return (
    <div className="question-selector">
      <div className="progrees">
        <Progress
          trailColor="#8DA0EE"
          strokeColor="#A0B1F1"
          showInfo={false}
          percent={20}
        />
      </div>
      <div className="question-scroll-container">{circleList}</div>
    </div>
  );
};

export default QuestionSelector;
