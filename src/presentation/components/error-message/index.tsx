import React, { LabelHTMLAttributes } from 'react';

import styles from './error-message.module.scss';

type ErrorMessageProps = LabelHTMLAttributes<HTMLLabelElement> & {
  name: string;
  error?: string;
}

export function ErrorMessage({ name, error = '' }: ErrorMessageProps) {
  return (
    <label data-testid={`${name}-error-message`} className={styles.errorMessage}>
      {error}
    </label>
  );
}
