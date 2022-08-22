import React from 'react';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases';
import { SignUp } from '@/presentation/pages';
import { makeSignUpValidation } from '@/main/factories/pages';

export const makeSignUp = () => (
  <SignUp
    validation={makeSignUpValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);
