import React from 'react';

import styles from './input.module.scss';

export function Input({ ...props }) {
  return (
    <input {...props} className={`${styles.input} ${props.className}`} />
  )
}