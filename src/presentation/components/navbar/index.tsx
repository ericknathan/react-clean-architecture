import React, { memo } from 'react';

import { Logo } from '@/presentation/components';

import styles from './navbar.module.scss';

function NavbarComponent() {
  return (
    <nav className={styles.navbarWrapper}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </nav>
  );
}

export const Navbar = memo(NavbarComponent);
