import React from 'react';
import copy from './copy.json';
import styles from './styles.scss';

let LoggedOutLayout = () => (
  <div className={styles.container}>
    {copy.loggedOutMessage}
  </div>
);

export default LoggedOutLayout;
