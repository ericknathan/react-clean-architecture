import { RemoteLoadSurveyList } from '@/data/usecases';
import { makeApiUrl, makeHttpClient } from '@/main/factories/http';
import { LoadSurveyList } from '@/domain/usecases';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeHttpClient());
