import React, { memo } from 'react';
import { useApiContext, useLogout } from '@/presentation/hooks';
import { Logo } from '@/presentation/components/logo';

import styles from './header.module.scss';

export function HeaderComponent({ ...props }) {
  const handleLogout = useLogout();
  const { getCurrentAccount } = useApiContext();

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    handleLogout();
  };

  return (
    <header className={styles.headerWrapper} {...props}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span data-testid="header-username">{getCurrentAccount()?.name}</span>
          <a data-testid="header-logout-button" href="#" onClick={handleButtonClick}>Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
