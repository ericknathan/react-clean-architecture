import React from 'react';
import styles from './signup.module.scss';
import { SignUpForm } from './components';
import { SignInNavbar } from '@/presentation/pages/signin/components';
import { Validation } from '@/presentation/protocols';
import { AddAccount } from '@/domain/usecases';

export type SignUpProps = {
  validation?: Validation;
  addAccount?: AddAccount
}

export function SignUp({ validation, addAccount }: SignUpProps) {
  return (
    <div className={styles.signUpWrapper}>
      <SignInNavbar />
      <SignUpForm
        validation={validation}
        addAccount={addAccount}
      />
    </div>
  );
}
