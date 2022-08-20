import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

type RouterProps = {
  MakeLogin: React.FC;
}

export function Router({ MakeLogin }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  )
}