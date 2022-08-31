import React, { useEffect } from 'react';
import { Footer, Header } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import styles from './survey-list.module.scss';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);

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
