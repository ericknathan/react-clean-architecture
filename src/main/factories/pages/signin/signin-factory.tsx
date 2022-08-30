import React from 'react';
import { makeRemoteAuthentication, makeLocalUpdateCurrentAccount } from '@/main/factories/usecases';
import { SignIn } from '@/presentation/pages';
import { makeSignInValidation } from '@/main/factories/pages';

export const makeSignIn = () => (
  <SignIn
    authentication={makeRemoteAuthentication()}
    validation={makeSignInValidation()}
    updateCurrentAccount={makeLocalUpdateCurrentAccount()}
  />
);
