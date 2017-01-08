import React from 'react';
import LoginForm from '~/components/Form/Login';
import styles from './styles.scss';

let LoginLayout = () => (
  <div className={styles.container}>
    <LoginForm />
  </div>
);

export default LoginLayout;
