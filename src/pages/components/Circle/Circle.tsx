import { useState, FunctionComponent, useEffect } from 'react';
import './Circle.less';
import { useStore } from 'umi';
import { GlobalStateType } from '../../../@types/store';
export interface CircleProps {
  id: number;
  currentId: number;
}

type Status = 'undo' | 'ing' | 'done';

const Circle: FunctionComponent<CircleProps> = (props: CircleProps) => {
  const [type, setType] = useState<Status>('undo');

  /**
   * @description 只需要对比当前 ID 的题目序号是否已经存在 finishedMap中
   * 如有存在则表示，为 done，如果则去对比与 currentId的比较
   */

  const store = useStore<GlobalStateType>().getState();

  useEffect(() => {
    if (store.question.finishedMap.has(props.id)) {
      setType('done');
    } else if (props.currentId === props.id) {
      setType('ing');
    } else {
      setType('undo');
    }
  }, [props.id, props.currentId, store]);

  return (
    <div className={`circle-container ${type}`} data-key={props.id}>
      <span data-key={props.id} className="number">
        {props.id + 1}
      </span>
    </div>
  );
};

export default Circle;
