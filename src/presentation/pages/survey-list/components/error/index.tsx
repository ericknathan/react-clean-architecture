import React from 'react';
import { useSurveyContext } from '@/presentation/pages/survey-list/context';
import styles from './error.module.scss';

export function SurveyError() {
  const { surveyListStates } = useSurveyContext();

  return (
    <div className={styles.errorWrapper}>
      <span data-testid="survey-list-error">{surveyListStates.error}</span>
      <button>Recarregar</button>
    </div>
  );
}
