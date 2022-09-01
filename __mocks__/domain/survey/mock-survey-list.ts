import { faker } from '@faker-js/faker/locale/pt_BR';

import { Survey } from '@/domain/models';

export const mockSurveyModel = (): Survey.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    { answer: faker.random.words(4), image: faker.internet.avatar() },
    { answer: faker.random.words(4) },
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
});


export const mockSurveyListModel = (): Survey.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
]);
