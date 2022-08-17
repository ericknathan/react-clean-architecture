import { Button, Input } from '@/presentation/components';
import React from 'react';

import styles from './login-form.module.scss';

export function LoginForm() {
  return (
    <form className={styles.form} action="submit">
      <h2>Realizar login</h2>
      <Input type="email" name="email" placeholder="Digite seu e-mail" />
      <Input type="password" name="password" placeholder="Digite sua senha" />
      <Button className={styles.submitButton}>Entrar</Button>
      <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
    </form>
  )
}