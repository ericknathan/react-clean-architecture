import React, { useEffect, useState } from 'react';

import { Button, Input, ErrorMessage } from '@/presentation/components';

import styles from './signin-form.module.scss';
import { SignInProps } from '@/presentation/pages/signin';
import { Link, useNavigate } from 'react-router-dom';
import { useApiContext } from '@/presentation/hooks';

type StateProps = {
  isLoading: boolean;
  email: string;
  password: string;
  errors: {
    [key: string]: string;
  }
}

export function SignInForm({ validation, authentication }: SignInProps) {
  const { setCurrentAccount } = useApiContext();
  const navigate = useNavigate();
  const [formStates, setFormStates] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: '',
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

      const { email, password } = formStates;
      const account = await authentication.auth({ email, password });
      if(account) {
        console.log({ account });
        setCurrentAccount!(account);
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
    const { email, password } = formStates;
    const formData = { email, password };
    setFormStates({
      ...formStates,
      errors: {
        ...formStates.errors,
        main: '',
        email: formStates.email ? validation.validate({ fieldName: 'email', input: formData }) || '' : '',
        password: formStates.password ? validation.validate({ fieldName: 'password', input: formData }) || '' : '',
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
      <ErrorMessage
        name="main"
        error={formStates.errors.main} />
      <Button
        data-testid="signin-button"
        className={styles.submitButton}
        disabled={isFormInvalid}
        isLoading={formStates.isLoading}
      >
        Entrar
      </Button>
      <Link
        data-testid="signup-link"
        to="/signup"
        className={styles.createAccountButton}
      >
        Não possui um cadastro? Criar conta
      </Link>
    </form>
  );
}
