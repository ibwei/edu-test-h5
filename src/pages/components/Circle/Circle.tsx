import { useState, FunctionComponent, useEffect } from 'react';
import './Circle.less';
export interface CircleProps {
  id: number;
  currentId: number;
}

type Status = 'undo' | 'ing' | 'done';

const Circle: FunctionComponent<CircleProps> = (props: CircleProps) => {
  const [type, setType] = useState<Status>('undo');

  useEffect(() => {
    if (props.currentId === props.id) {
      setType('ing');
    } else if (props.currentId < props.id) {
      setType('undo');
    } else {
      setType('done');
    }
  }, [props.id, props.currentId]);

  return (
    <div className={`circle-container ${type}`}>
      <span className="number">{props.id + 1}</span>
    </div>
  );
};

export default Circle;
