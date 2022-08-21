import React, { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button data-testid="button" {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
