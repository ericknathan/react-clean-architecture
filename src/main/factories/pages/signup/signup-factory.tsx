import React from 'react';
import { makeRemoteAddAccount } from '@/main/factories/usecases';
import { SignUp } from '@/presentation/pages';
import { makeSignUpValidation } from '@/main/factories/pages';

export const makeSignUp = () => (
  <SignUp
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
  />
);
