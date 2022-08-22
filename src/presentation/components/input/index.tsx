import React, { InputHTMLAttributes } from 'react';
import { ErrorMessage } from '../error-message';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
}

export function Input({ name, error = '', ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input title={error} {...props} name={name} autoComplete="off" className={`${styles.input} ${error.trim() !== '' ? styles.inputError : ''} ${props.className || ''}`} />
      <ErrorMessage
        name={name}
        error={error}
      />
    </div>
  );
}
