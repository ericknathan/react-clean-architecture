import React from 'react';
import styles from './signup.module.scss';
import { SignUpForm } from './components';
import { Footer, Navbar } from '@/presentation/components';
import { Validation } from '@/presentation/protocols';
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases';

export type SignUpProps = {
  validation?: Validation;
  addAccount?: AddAccount
  updateCurrentAccount?: UpdateCurrentAccount;
}

export function SignUp({ validation, addAccount, updateCurrentAccount }: SignUpProps) {
  return (
    <div className={styles.signUpWrapper}>
      <Navbar />
      <div className={styles.formWrapper}>
        <SignUpForm
          validation={validation}
          addAccount={addAccount}
          updateCurrentAccount={updateCurrentAccount}
        />
        <Footer />
      </div>
    </div>
  );
}
