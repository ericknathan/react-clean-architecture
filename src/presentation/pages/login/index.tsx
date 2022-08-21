import React from 'react';
import styles from './login.module.scss';
import { LoginNavbar, LoginForm } from './components';
import { Validation } from '@/presentation/protocols';
import { Authentication, SaveAccessToken } from '@/domain/usecases';

export type LoginProps = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
}

export function Login({ validation, authentication, saveAccessToken }: LoginProps) {
  return (
    <div className={styles.loginWrapper}>
      <LoginNavbar />
      <LoginForm validation={validation} authentication={authentication} saveAccessToken={saveAccessToken} />
    </div>
  );
}
