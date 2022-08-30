import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { SurveyList } from '@/presentation/pages';

type RouterFacotry = {
  makeSignIn: React.FC;
  makeSignUp: React.FC;
}

export function Router({ makeSignIn: MakeSignIn, makeSignUp: MakeSignUp }: RouterFacotry) {
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
