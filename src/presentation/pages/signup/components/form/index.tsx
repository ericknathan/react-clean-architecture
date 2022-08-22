import React, { useEffect, useState } from 'react';

import { SignUpProps } from '@/presentation/pages';
import { Button, Input } from '@/presentation/components';

import styles from './signup-form.module.scss';

type StateProps = {
  isLoading: boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: {
    [key: string]: string;
  }
}

export function SignUpForm({ validation, addAccount }: SignUpProps) {
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
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

      const { name, email, password, passwordConfirmation } = formStates;
      await addAccount?.add({
        name,
        email,
        password,
        passwordConfirmation
      });
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
        name: formStates.name.trim().length > 0 ? validation?.validate({ fieldName: 'name', fieldValue: formStates.name }) || '' : '',
        email: formStates.email.trim().length > 0 ? validation?.validate({ fieldName: 'email', fieldValue: formStates.email }) || '' : '',
        password: formStates.password.trim().length > 0 ? validation?.validate({ fieldName: 'password', fieldValue: formStates.password }) || '' : '',
        passwordConfirmation: formStates.passwordConfirmation.trim().length > 0 ? validation?.validate({ fieldName: 'passwordConfirmation', fieldValue: formStates.passwordConfirmation }) || '' : '',
      }
    });
  }, [formStates.name, formStates.email, formStates.password, formStates.passwordConfirmation]);
  
  return (
    <form
      data-testid="form"
      className={styles.form}
      onSubmit={handleSubmitSignInForm}
    >
      <h2>Realizar Cadastro</h2>
      <Input
        data-testid="name-input"
        type="text"
        name="name"
        placeholder="Digite seu nome"
        required
        onChange={handleInputChange}
        error={formStates.errors.name} />
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
      <Input
        data-testid="password-confirmation-input"
        type="password"
        name="passwordConfirmation"
        placeholder="Digite sua confirmação de senha"
        required
        onChange={handleInputChange}
        error={formStates.errors.passwordConfirmation} />
      <Button
        data-testid="signup-button"
        className={styles.submitButton}
        disabled={
          formStates.name.trim() === '' || formStates.email.trim() === '' || formStates.password.trim() === '' || formStates.passwordConfirmation.trim() === '' ||
          formStates.errors.name !== '' || formStates.errors.email !== '' || formStates.errors.password !== '' || formStates.errors.passwordConfirmation !== ''
        }
        isLoading={formStates.isLoading}
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
