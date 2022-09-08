import React, { ButtonHTMLAttributes } from 'react';
import { Spinner } from '@/presentation/components';

import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function Button({ children, className = '', isLoading = false, ...props }: ButtonProps) {
  return (
    <button data-testid="button" {...props} className={`${styles.button} ${className}`}>
      {isLoading ? <Spinner /> : children} 
    </button>
  );
}
