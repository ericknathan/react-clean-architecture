import React from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({ children, className, disabled, ...props }: ButtonProps) {
  return (
    <button disabled={disabled} {...props} className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  )
}