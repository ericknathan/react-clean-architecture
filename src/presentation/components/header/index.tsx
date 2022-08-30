import React, { memo } from 'react';
import { Logo } from '@/presentation/components/logo';

import styles from './header.module.scss';

export function HeaderComponent({ ...props }) {
  return (
    <header className={styles.headerWrapper} {...props}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>Erick</span>
          <a href="">Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
