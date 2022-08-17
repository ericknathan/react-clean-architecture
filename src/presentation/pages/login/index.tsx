import React from 'react';

import { Button, Input } from '@/presentation/components';

import styles from './login-styles.module.scss';

export function Login() {
  return (
    <div className={styles.loginWrapper}>
      <header className={styles.header}>
        <img src="/images/logo.svg" alt="" />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
      <form className={styles.form} action="">
        <h2>Realizar login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Button className={styles.submitButton}>Entrar</Button>
        <a href="#" className={styles.createAccountButton}>Não possui um cadastro? Criar conta</a>
      </form>
      <footer className={styles.footer} />
    </div>
  )
}