import React from 'react';

import styles from './input-styles.module.scss';

export function Input({ ...props }) {
  return (
    <input {...props} className={`${styles.input} ${props.className}`} />
  )
}