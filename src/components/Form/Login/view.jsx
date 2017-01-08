import React from 'react';
import { Field } from 'redux-form';
import styles from './styles.scss';

export type PropTypes = {
  handlers: {
    [id: string]: Function
  }
};

let LoginForm = ({handlers}: PropTypes) => (
  <form className={styles.form} {...handlers.form}>
    <div className={styles.column}>
      <label className={styles.label} htmlFor="username">Username</label>
      <Field component="input" name="username" type="text" />
    </div>
    <div className={styles.column}>
      <label className={styles.label} htmlFor="password">Password</label>
      <Field component="input" name="password" type="password" />
    </div>
    <div className={styles.column}>
      <button type="submit">Login</button>
    </div>
  </form>
);

export default LoginForm;
