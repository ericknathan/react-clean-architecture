import React, { useEffect, useState } from 'react';

import { Button, Input, Spinner } from '@/presentation/components';

import styles from './signin-form.module.scss';
import { SignInProps } from '../..';
import { Link, useNavigate } from 'react-router-dom';

type StateProps = {
  isLoading: boolean;
  email: string;
  password: string;
  errors: {
    [key: string]: string;
  }
}

export function SignInForm({ validation, authentication, saveAccessToken }: SignInProps) {
  const navigate = useNavigate();
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

  async function handleSubmitSignInForm(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if(formStates.isLoading || formStates.errors.email || formStates.errors.password) return;
  
      setFormStates({ ...formStates, isLoading: true });

      const account = await authentication?.auth({ email: formStates.email, password: formStates.password });
      if(account) {
        await saveAccessToken.save(account.accessToken);
        navigate('/', { replace: true });
      }
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
        email: formStates.email.trim().length > 0 ? validation.validate({ fieldName: 'email', fieldValue: formStates.email }) || '' : '',
        password: formStates.password.trim().length > 0 ? validation.validate({ fieldName: 'password', fieldValue: formStates.password }) || '' : '',
      }
    });
  }, [formStates.email, formStates.password]);
  
  return (
    <form
      data-testid="form"
      className={styles.form}
      onSubmit={handleSubmitSignInForm}
    >
      <h2>Realizar Login</h2>
      <Input
        data-testid="email-input"
        type="email"
        name="email"
        placeholder="Digite seu e-mail"
        required
        onChange={handleInputChange}
        error={formStates.errors.email} />
      <Input
        data-testid="password-input"
        type="password"
        name="password"
        placeholder="Digite sua senha"
        required
        onChange={handleInputChange}
        error={formStates.errors.password} />
      <Button
        data-testid="signin-button"
        className={styles.submitButton}
        disabled={formStates.email.trim() === '' || formStates.password.trim() === '' || formStates.errors.email !== '' || formStates.errors.password !== ''}
      >
        {formStates.isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <Link
        data-testid="signup-button"
        to="/signup"
        className={styles.createAccountButton}
      >
        Não possui um cadastro? Criar conta
      </Link>
    </form>
  );
}