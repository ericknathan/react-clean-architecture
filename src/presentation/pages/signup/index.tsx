import React from 'react';
import styles from './signup.module.scss';
import { SignUpForm } from './components';
import { SignInNavbar } from '@/presentation/pages/signin/components';

export function SignUp() {
  return (
    <div className={styles.signUpWrapper}>
      <SignInNavbar />
      <SignUpForm />
    </div>
  );
}
