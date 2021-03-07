import React from 'react';
import styles from './user.css';
import { Link } from 'umi';

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>Page user</h1>
      <Link to="/">go to home</Link>
    </div>
  );
}
