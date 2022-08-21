import React from 'react';
import styles from './signin.module.scss';
import { SignInNavbar, SignInForm } from './components';
import { Validation } from '@/presentation/protocols';
import { Authentication, SaveAccessToken } from '@/domain/usecases';

export type SignInProps = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
}

export function SignIn({ validation, authentication, saveAccessToken }: SignInProps) {
  return (
    <div className={styles.signInWrapper}>
      <SignInNavbar />
      <SignInForm validation={validation} authentication={authentication} saveAccessToken={saveAccessToken} />
    </div>
  );
}
