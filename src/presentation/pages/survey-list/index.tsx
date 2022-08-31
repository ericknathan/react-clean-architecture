import React from 'react';
import { Footer, Header } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import styles from './survey-list.module.scss';

export function SurveyList() {
  return (
    <div className={styles.surveyListWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul className={styles.surveyList} data-testid="survey-list">
          <SurveyItem.Card />
          <SurveyItem.Skeleton />
        </ul>
      </div>
      <Footer />
    </div>
  );
}
