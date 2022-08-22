import React from 'react';

import { Button, Input } from '@/presentation/components';

import styles from './signup-form.module.scss';

export function SignUpForm() {
  return (
    <form
      data-testid="form"
      className={styles.form}
    >
      <h2>Realizar Cadastro</h2>
      <Input
        data-testid="name-input"
        type="text"
        name="name"
        placeholder="Digite seu nome"
        required />
      <Input
        data-testid="email-input"
        type="email"
        name="email"
        placeholder="Digite seu e-mail"
        required />
      <Input
        data-testid="password-input"
        type="password"
        name="password"
        placeholder="Digite sua senha"
        required />
      <Input
        data-testid="password-confirmation-input"
        type="password"
        name="password-confirmation"
        placeholder="Digite sua confirmação de senha"
        required />
      <Button
        data-testid="signup-button"
        className={styles.submitButton}
        disabled
      >
        Criar conta
      </Button>
      <a
        data-testid="signin-button"
        href="/signin"
        className={styles.createAccountButton}
      >
        Já possui um cadastro? Fazer login
      </a>
    </form>
  );
}
