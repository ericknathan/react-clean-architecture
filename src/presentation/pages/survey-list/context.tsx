import { createContext, useContext } from 'react';
import { Survey } from '@/domain/models';

export type SurveyListState = {
  surveys: Survey.Model[] | []
  error: string
}

type SurveyListContext = {
  surveyListStates: SurveyListState,
  setSurveyListStates: (state: SurveyListState) => void
}

const SurveyContext = createContext<SurveyListContext>(null!);

function useSurveyContext() {
  return useContext(SurveyContext);
}

export { SurveyContext, useSurveyContext };
