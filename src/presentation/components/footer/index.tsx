import React from 'react';

import styles from './footer.module.scss';

export function Footer({ ...props }) {
  return (
    <footer className={styles.footerWrapper} {...props}>
      <div className={styles.footerContent}>
        <p>
          <a href="https://github.com/ericknathan">Erick Nathan</a>
          {' '}
          | Todos os direitos reservados &copy;
          {' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
