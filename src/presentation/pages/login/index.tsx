import React from 'react';
import styles from './login.module.scss';
import { LoginNavbar, LoginForm } from './components';
import { Validation } from '@/presentation/protocols';

export type LoginProps = {
  validation?: Validation;
}

export function Login({ validation }: LoginProps) {
  return (
    <div className={styles.loginWrapper}>
      <LoginNavbar />
      <LoginForm validation={validation} />
    </div>
  )
}