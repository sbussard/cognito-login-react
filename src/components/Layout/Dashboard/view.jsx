import React from 'react';
import copy from './copy.json';
import styles from './styles.scss';

let DashboardLayout = () => (
  <div className={styles.container}>
    {copy.dashboard}
  </div>
);

export default DashboardLayout;
