import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { SignUp } from '@/presentation/pages';

type RouterProps = {
  makeSignIn: React.FC;
}

export function Router({ makeSignIn: MakeSignIn }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<MakeSignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
