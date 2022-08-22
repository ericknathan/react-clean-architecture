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

export function SignUpForm({ validation }: SignUpProps) {
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
