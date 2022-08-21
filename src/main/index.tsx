import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/pages';
import '@/presentation/styles/global.scss';
import { makeLogin } from '@/main/factories/pages';

ReactDOM.render(
  <Router
    MakeLogin={makeLogin}
  />,
  document.getElementById('main')
);
