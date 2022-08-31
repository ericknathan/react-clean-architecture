import React from 'react';
import styles from './signin.module.scss';
import { SignInForm } from './components';
import { Footer, Navbar } from '@/presentation/components';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';

export type SignInProps = {
  validation: Validation;
  authentication: Authentication;
}

export function SignIn({ validation, authentication }: SignInProps) {
  return (
    <div className={styles.signInWrapper}>
      <Navbar />
      <div className={styles.formWrapper}>
        <SignInForm
          validation={validation}
          authentication={authentication}
        />
        <Footer />
      </div>
    </div>
  );
}
