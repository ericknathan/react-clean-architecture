import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  makeSignIn as MakeSignIn,
  makeSignUp as MakeSignUp
} from '@/main/factories/pages';
import { SurveyList } from '@/presentation/pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<MakeSignIn />} />
        <Route path="/signup" element={<MakeSignUp />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
}
