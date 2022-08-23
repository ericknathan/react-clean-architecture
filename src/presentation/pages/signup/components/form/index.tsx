import React, { useEffect, useState } from 'react';

import { Button, ErrorMessage, Input } from '@/presentation/components';

import styles from './signup-form.module.scss';
import { SignUpProps } from '@/presentation/pages';
import { Link, useNavigate } from 'react-router-dom';


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

export function SignUpForm({ validation, addAccount, saveAccessToken }: SignUpProps) {
  const navigate = useNavigate();
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {}
  });

  const isFormInvalid =
    Object.values(formStates).filter(value => typeof value === 'string' && value.trim() === '').length > 0 ||
    Object.values(formStates.errors).filter(value => value.trim() !== '').length > 0;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormStates({ ...formStates, [name]: value });
  }

  async function handleSubmitSignInForm(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if(formStates.isLoading || isFormInvalid) return;
  
      setFormStates({ ...formStates, isLoading: true });

      const { name, email, password, passwordConfirmation } = formStates;
      const account = await addAccount?.add({
        name,
        email,
        password,
        passwordConfirmation
      });

      if(account) {
        await saveAccessToken?.save(account.accessToken);
        navigate('/', { replace: true });
      }
    } catch (error) {
      setFormStates({
        ...formStates,
        isLoading: true,
        errors: {
          main: error instanceof Error ? error.message : '',
        }
      });
    } finally {
      setTimeout(() => setFormStates((previousState) => ({ ...previousState, isLoading: false })), 500);
    }
  }

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = formStates;
    const formData = { name, email, password, passwordConfirmation };
    setFormStates({
      ...formStates,
      errors: {
        ...formStates.errors,
        main: '',
        name: formStates.name ? validation?.validate({ fieldName: 'name', input: formData }) || '' : '',
        email: formStates.email ? validation?.validate({ fieldName: 'email', input: formData }) || '' : '',
        password: formStates.password ? validation?.validate({ fieldName: 'password', input: formData }) || '' : '',
        passwordConfirmation: formStates.passwordConfirmation ? validation?.validate({ fieldName: 'passwordConfirmation', input: formData }) || '' : '',
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
      <ErrorMessage
        name="main"
        error={formStates.errors.main} />
      <Button
        data-testid="signup-button"
        className={styles.submitButton}
        disabled={isFormInvalid}
        isLoading={formStates.isLoading}
      >
        Criar conta
      </Button>
      <Link
        data-testid="signin-link"
        to="/signin"
        className={styles.createAccountButton}
      >
        Já possui um cadastro? Fazer login
      </Link>
    </form>
  );
}
