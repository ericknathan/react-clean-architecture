import React from 'react';
import styles from './signup.module.scss';
import { SignUpForm } from './components';
import { SignInNavbar } from '@/presentation/pages/signin/components';
import { Validation } from '@/presentation/protocols';

export type SignUpProps = {
  validation?: Validation;
}

export function SignUp({ validation }: SignUpProps) {
  return (
    <div className={styles.signUpWrapper}>
      <SignInNavbar />
      <SignUpForm validation={validation} />
    </div>
  );
}
