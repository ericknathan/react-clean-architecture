import React, { memo } from 'react';
import { useApiContext } from '@/presentation/hooks';
import { Logo } from '@/presentation/components/logo';

import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';

export function HeaderComponent({ ...props }) {
  const navigate = useNavigate();
  const { setCurrentAccount } = useApiContext();

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setCurrentAccount(null);
    navigate('/signin', { replace: true });
  };

  return (
    <header className={styles.headerWrapper} {...props}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>Erick</span>
          <a data-testid="header-logout-button" href="#" onClick={handleLogout}>Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
