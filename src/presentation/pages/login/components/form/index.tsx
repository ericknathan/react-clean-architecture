import React, { useEffect, useState } from 'react';

import { Button, Input, Spinner } from '@/presentation/components';

import styles from './login-form.module.scss';
import { LoginProps } from '../..';
import { InvalidCredentialsError } from '@/domain/errors';
import { Link } from 'react-router-dom';

type StateProps = {
  isLoading: boolean;
  email: string;
  password: string;
  errors: {
    [key: string]: string;
  }
}

export function LoginForm({ validation, authentication }: LoginProps) {
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

  async function handleSubmitLoginForm(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if(formStates.isLoading || formStates.errors.email || formStates.errors.password) return;
  
      setFormStates({ ...formStates, isLoading: true });

      const account = await authentication?.auth({ email: formStates.email, password: formStates.password });
      if(account) localStorage.setItem('@4devs/accessToken', account.accessToken);
    } catch (error) {
      setFormStates({
        ...formStates,
        isLoading: true,
        errors: {
          ...formStates.errors,
          email: error instanceof Error ? error.message : '',
          password: error instanceof Error ? error.message : '',
        }
      });
    } finally {
      setTimeout(() => setFormStates((previousState) => ({ ...previousState, isLoading: false })), 500);
    }
  }

  useEffect(() => {
    setFormStates({
      ...formStates,
      errors: {
        ...formStates.errors,
        email: validation?.validate({ fieldName: 'email', fieldValue: formStates.email }) || '',
        password: validation?.validate({ fieldName: 'password', fieldValue: formStates.password }) || '',
      }
    })
  }, [formStates.email, formStates.password]);
  
  return (
    <form data-testid="form" className={styles.form} onSubmit={handleSubmitLoginForm}>
      <h2>Realizar login</h2>
      <Input data-testid="email-input" type="email" name="email" placeholder="Digite seu e-mail" required onChange={handleInputChange} error={formStates.errors.email} />
      <Input data-testid="password-input" type="password" name="password" placeholder="Digite sua senha" required onChange={handleInputChange}  error={formStates.errors.password}/>
      <Button data-testid="signin-button"  className={styles.submitButton} disabled={formStates.email.trim() === '' || formStates.password.trim() === ''}>
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <Link data-testid="signup-button" to="/signup" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</Link>
    </form>
  )
}