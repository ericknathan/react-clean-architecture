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
      <Input type="email" name="email" placeholder="Digite seu e-mail" />
      <Input type="password" name="password" placeholder="Digite sua senha" />
      <Button className={styles.submitButton}>
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
    </form>
  )
}