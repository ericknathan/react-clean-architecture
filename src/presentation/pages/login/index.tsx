import React from 'react';
import styles from './login.module.scss';
import { LoginNavbar, LoginForm } from './components';

export function Login() {
  return (
    <div className={styles.loginWrapper}>
      <LoginNavbar />
      <LoginForm />
    </div>
  )
}