import { makeApiUrl } from '@/main/factories/http';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';
import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator());
