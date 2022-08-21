export class UnexpectedError extends Error {
  constructor() {
    super('Ocorreu um erro inesperado. Tente novamente em breve.');
    this.name = 'UnexpectedError';
  }
}
