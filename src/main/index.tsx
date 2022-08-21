import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/pages';
import '@/presentation/styles/global.scss';
import { makeSignIn } from '@/main/factories/pages';

ReactDOM.render(
  <Router
    makeSignIn={makeSignIn}
  />,
  document.getElementById('main')
);
