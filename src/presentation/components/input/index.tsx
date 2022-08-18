import React from 'react';

import styles from './input.module.scss';

export function Input({ ...props }) {
  return (
    <input {...props} autoComplete="off" className={`${styles.input} ${props.className}`} />
  )
}