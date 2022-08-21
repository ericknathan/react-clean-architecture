import React from 'react';
import { makeRemoteAuthentication, makeLocalSaveAccessToken } from '@/main/factories/usecases';
import { Login } from '@/presentation/pages';
import { makeLoginValidation } from '@/main/factories/pages';

export const makeLogin = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
)