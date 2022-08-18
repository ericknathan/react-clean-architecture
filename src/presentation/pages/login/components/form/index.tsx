import React, { useEffect, useState } from 'react';

import { Button, Input, Spinner } from '@/presentation/components';

import styles from './login-form.module.scss';
import { LoginProps } from '../..';

type StateProps = {
  isLoading: boolean;
  email: string;
  password: string;
}

export function LoginForm({ validation }: LoginProps) {
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: ''
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormStates({ ...formStates, [name]: value });
  }

  useEffect(() => {
    const { email, password } = formStates;
    validation?.validate({ email, password });
  }, [formStates.email, formStates.password]);
  
  return (
    <form className={styles.form} action="submit">
      <h2>Realizar login</h2>
      <Input data-testid="email-input" type="email" name="email" placeholder="Digite seu e-mail" required onChange={handleInputChange}/>
      <Input data-testid="password-input" type="password" name="password" placeholder="Digite sua senha" required onChange={handleInputChange}/>
      <Button className={styles.submitButton} disabled>
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
    </form>
  )
}