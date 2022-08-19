import React, { useEffect, useState } from 'react';

import { Button, Input, Spinner } from '@/presentation/components';

import styles from './login-form.module.scss';
import { LoginProps } from '../..';

type StateProps = {
  isLoading: boolean;
  email: string;
  password: string;
  errors: {
    [key: string]: string;
  }
}

export function LoginForm({ validation }: LoginProps) {
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    }
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormStates({ ...formStates, [name]: value });
  }

  function handleValidate(fieldName: string, fieldValue: string) {
    setFormStates({
      ...formStates,
      errors: {
        ...formStates.errors,
        [fieldName]: validation?.validate({ fieldName, fieldValue }) || '',
      }
    })
  }

  async function handleSubmitLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStates({ ...formStates, isLoading: true });
  }

  useEffect(() => {
    handleValidate('email', formStates.email);
  }, [formStates.email]);

  useEffect(() => {
    handleValidate('password', formStates.password);
  }, [formStates.password]);
  
  return (
    <form className={styles.form} onSubmit={handleSubmitLoginForm}>
      <h2>Realizar login</h2>
      <Input data-testid="email-input" type="email" name="email" placeholder="Digite seu e-mail" required onChange={handleInputChange} error={formStates.errors.email} />
      <Input data-testid="password-input" type="password" name="password" placeholder="Digite sua senha" required onChange={handleInputChange}  error={formStates.errors.password}/>
      <Button className={styles.submitButton} disabled={formStates.email.trim() === '' || formStates.password.trim() === ''}>
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
    </form>
  )
}