import { useCallback, useState } from 'react';
export default function useToggle() {
  const [toggle, setToggle] = useState(false);
  const changeToggle = useCallback(() => setToggle(!toggle), [toggle]);
  return {
    toggle,
    changeToggle,
  };
}
