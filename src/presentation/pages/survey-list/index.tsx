import React, { useEffect, useState } from 'react';
import {  Footer, Header } from '@/presentation/components';
import { SurveyError, SurveyListItems } from '@/presentation/pages/survey-list/components';
import { SurveyContext, SurveyListState } from '@/presentation/pages/survey-list/context';
import { LoadSurveyList } from '@/domain/usecases';
import styles from './survey-list.module.scss';
import { AccessDeniedError } from '@/domain/errors';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '@/presentation/hooks';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: SurveyListProps) {
  const navigate = useNavigate();
  const { setCurrentAccount } = useApiContext();

  const [surveyListStates, setSurveyListStates] = useState<SurveyListState>({
    surveys: [],
    error: '',
    reload: false,
  });

  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll();
        setSurveyListStates({ ...surveyListStates, surveys });
      } catch (error) {
        if(error instanceof AccessDeniedError) {
          setCurrentAccount(null);
          navigate('/signin', { replace: true });
        } else setSurveyListStates({ ...surveyListStates, error: (error as Error).message });
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
