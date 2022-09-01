import React from 'react';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { useSurveyContext } from '@/presentation/pages/survey-list/context';
import styles from './list.module.scss';

export function SurveyListItems() {
  const { surveyListStates } = useSurveyContext();
  return (
    <ul className={styles.surveyList} data-testid="survey-list">
      {
        surveyListStates.surveys.length ?
          surveyListStates.surveys.map((survey) => <SurveyItem.Card key={survey.id} survey={survey} />) :
          <SurveyItem.Skeleton />
      }
    </ul>
  );
}
