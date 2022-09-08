import React from 'react';
import { useSurveyContext } from '@/presentation/pages/survey-list/context';
import styles from './error.module.scss';

export function SurveyError() {
  const { surveyListStates, setSurveyListStates } = useSurveyContext();
  const reload = (): void => {
    setSurveyListStates({
      surveys: [],
      error: '',
      reload: !surveyListStates.reload,
    });
  };

  return (
    <div className={styles.errorWrapper}>
      <span data-testid="survey-list-error">{surveyListStates.error}</span>
      <button data-testid="survey-list-reload-button" onClick={reload}>Recarregar</button>
    </div>
  );
}
