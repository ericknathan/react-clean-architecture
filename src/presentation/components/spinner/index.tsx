import React from 'react';

import styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.ldsRing} data-testid="spinner">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
