import React, { useEffect, useState } from 'react';
import { useErrorHandler } from '@/presentation/hooks';
import { Footer, Header } from '@/presentation/components';
import { SurveyError, SurveyListItems } from '@/presentation/pages/survey-list/components';
import { SurveyContext, SurveyListState } from '@/presentation/pages/survey-list/context';
import { LoadSurveyList } from '@/domain/usecases';
import styles from './survey-list.module.scss';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  const handleError = useErrorHandler((error: Error) => {
    setSurveyListStates({ ...surveyListStates, error: error.message });
  });

  const [surveyListStates, setSurveyListStates] = useState<SurveyListState>({
    surveys: [],
    error: '',
    reload: false,
  });

  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll();
        setSurveyListStates(previousState => ({ ...previousState, surveys }));
      } catch (error: any) {
        handleError(error);
      }
    })();
  }, [surveyListStates.reload]);

  return (
    <div className={styles.surveyListWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ surveyListStates, setSurveyListStates }}>
          {surveyListStates.error ? <SurveyError /> : <SurveyListItems />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
}
