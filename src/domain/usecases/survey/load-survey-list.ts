import { Survey } from '@/domain/models';

export interface LoadSurveyList {
  loadAll(): Promise<LoadSurveyList.Result>
}

export namespace LoadSurveyList {
  export type Result = Survey.Model[];
}
