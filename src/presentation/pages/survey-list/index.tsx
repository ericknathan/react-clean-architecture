import React, { useEffect, useState } from 'react';
import { Footer, Header } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import styles from './survey-list.module.scss';
import { Survey } from '@/domain/models';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  const [surveyList, setSurveyList] = useState<Survey.Model[]>([]);
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll().then(surveyList => setSurveyList(surveyList));
    })();
  }, []);

  return (
    <div className={styles.surveyListWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul className={styles.surveyList} data-testid="survey-list">
          {
            surveyList.length ?
              surveyList.map((survey) => (
                <SurveyItem.Card key={survey.id} survey={survey} />
              )) :
              <SurveyItem.Skeleton />
          }
        </ul>
      </div>
      <Footer />
    </div>
  );
}
