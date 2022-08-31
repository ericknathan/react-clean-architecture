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
import { AppProvider } from '@/presentation/contexts';
import { PrivateRoute, SurveyList } from '@/presentation/pages';

export function Router() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<MakeSignIn />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<SurveyList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
