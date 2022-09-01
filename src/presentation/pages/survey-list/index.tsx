import React, { useEffect, useState } from 'react';
import { Footer, Header } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import styles from './survey-list.module.scss';
import { Survey } from '@/domain/models';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

type SurveyListState = {
  surveys: Survey.Model[]
  error: string
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  const [surveyListStates, setSurveyListStates] = useState<SurveyListState>({
    surveys: [],
    error: ''
  });
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll()
        .then(surveys => setSurveyListStates({ ...surveyListStates, surveys }))
        .catch(error => setSurveyListStates({ ...surveyListStates, error: error.message }));
    })();
  }, []);

  return (
    <div className={styles.surveyListWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        {
          surveyListStates.error ?
            <div>
              <span data-testid="survey-list-error">{surveyListStates.error}</span>
              <button>Recarregar</button>
            </div> :
            <ul className={styles.surveyList} data-testid="survey-list">
              {
                surveyListStates.surveys.length ?
                  surveyListStates.surveys.map((survey) => <SurveyItem.Card key={survey.id} survey={survey} />) :
                  <SurveyItem.Skeleton />
              }
            </ul>
        }
      </div>
      <Footer />
    </div>
  );
}
