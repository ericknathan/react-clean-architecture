import React from 'react';
import styles from './login.module.scss';
import { LoginNavbar, LoginForm } from './components';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';

export type LoginProps = {
  validation: Validation;
  authentication: Authentication;
}

export function Login({ validation, authentication }: LoginProps) {
  return (
    <div className={styles.loginWrapper}>
      <LoginNavbar />
      <LoginForm validation={validation} authentication={authentication} />
    </div>
  )
}