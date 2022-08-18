import React from 'react';

import styles from './spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.ldsRing}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}