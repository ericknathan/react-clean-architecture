import React, { useEffect, useState } from 'react';

import { Button, ErrorMessage, Input } from '@/presentation/components';

import styles from './signup-form.module.scss';
import { SignUpProps } from '@/presentation/pages';
import { Link, useNavigate } from 'react-router-dom';
import { useApiContext } from '@/presentation/hooks';

type FormFields = 'name' | 'email' | 'password' | 'passwordConfirmation';

type StateProps = {
  isLoading: boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: {
    [key in FormFields | 'main']?: string;
  }
}

export function SignUpForm({ validation, addAccount }: SignUpProps) {
  const { setCurrentAccount } = useApiContext();
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

  useEffect(() => validate('name'), [formStates.name]);
  useEffect(() => validate('email'), [formStates.email]);
  useEffect(() => validate('password'), [formStates.password]);
  useEffect(() => validate('passwordConfirmation'), [formStates.passwordConfirmation]);

  const validate = (fieldName: FormFields): void => {
    const { name, email, password, passwordConfirmation } = formStates;
    const formData = { name, email, password, passwordConfirmation };
    setFormStates(previousState => ({
      ...previousState,
      errors: {
        ...previousState.errors,
        main: '',
        [fieldName]: previousState[fieldName] ? validation?.validate({ fieldName, input: formData }) || '' : '',
      }
    }));
  };

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
        placeholder="Digite sua confirma????o de senha"
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
        J?? possui um cadastro? Fazer login
      </Link>
    </form>
  );
}
