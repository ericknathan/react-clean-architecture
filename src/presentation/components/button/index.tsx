import React from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  )
}