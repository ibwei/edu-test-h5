import { useEffect } from 'react';
import { history } from 'umi';
export default (props: any) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>this is test layout</h1>
      {props.children}
    </div>
  );
};
