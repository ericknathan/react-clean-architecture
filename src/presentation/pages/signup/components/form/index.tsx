import React, { useEffect, useState } from 'react';

import { SignUpProps } from '@/presentation/pages';
import { Button, Input } from '@/presentation/components';

import styles from './signup-form.module.scss';

type StateProps = {
  isLoading: boolean;
  name: string;
  email: string;
  errors: {
    [key: string]: string;
  }
}

export function SignUpForm({ validation }: SignUpProps) {
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    name: '',
    email: '',
    errors: {
      name: '',
      email: '',
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
      }
    });
  }, [formStates.name, formStates.email]);
  
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
