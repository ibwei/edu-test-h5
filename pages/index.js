import React from 'react';
import styles from './index.css';
import { Link } from 'umi';

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/user">go to user</Link>
    </div>
  );
}
