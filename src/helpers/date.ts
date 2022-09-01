export const formatDate = (date: Date) => {
  return date.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
};
