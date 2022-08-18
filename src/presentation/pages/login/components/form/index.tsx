import React, { useState } from 'react';

import { Button, Input, Spinner } from '@/presentation/components';

import styles from './login-form.module.scss';

type StateProps = {
  isLoading: boolean;
}

export function LoginForm() {
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false
  });
  
  return (
    <form className={styles.form} action="submit">
      <h2>Realizar login</h2>
      <Input data-testid="email-input" type="email" name="email" placeholder="Digite seu e-mail" required />
      <Input data-testid="password-input" type="password" name="password" placeholder="Digite sua senha" required />
      <Button className={styles.submitButton} disabled>
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
    </form>
  )
}