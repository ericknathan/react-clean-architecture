import React, { InputHTMLAttributes } from 'react';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
}

export function Input({ name, error = '', ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input {...props} name={name} autoComplete="off" className={`${styles.input} ${error.trim() !== '' ? styles.inputError : ''} ${props.className}`} />
      <label data-testid={`${name}-label`}>
        {error}
      </label>
    </div>
  )
}