import React, { memo } from 'react';

import { Logo } from '@/presentation/components';

import styles from './signin-navbar.module.scss';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </nav>
  );
}

export const SignInNavbar = memo(Navbar);
