import { FunctionComponent, useRef } from 'react';
import { Progress } from 'antd';
import './QuestionSelecotr.less';
import Circle from '../Circle/Circle';
import { useEffect } from 'react';

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
      setCurrentQuestionIndex(Number(e.target.dataset.key));
    }
  };

  /**
   * @method 滑动题目序号列表
   * @description 通过当前题号来计算应该滑动的位置，氛围三种情况
   * 1.当序号<6时，滑块滑到容器最左边
   * 2.当序号>6&&<45时，滑动到最左边
   * 3.其他情况，通过计算，（）当前序号-3）*每个序号宽度，则是滑块移动位置
   */
  const scrollQuestionView = () => {
    const container = document.getElementById('scroll-view');
    /*  const currentLeft = container?.scrollLeft as number;
    const currentOffsetLeft = container?.offsetLeft as number; */
    // const left = currentOffsetLeft - currentLeft;
    // 开始计算
    let left = 0;
    if (props.current < 3) {
      left = 0;
    } else {
      left = (props.current - 3) * 55;
    }

    container?.scrollTo({ left: left });
    console.log('container', container);
  };

  useEffect(() => {
    scrollQuestionView();
  }, [props.current]);

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
      <div
        id="scroll-view"
        className="question-scroll-container"
        onClick={changeQuestion}
      >
        {circleList}
      </div>
    </div>
  );
};

export default QuestionSelector;
