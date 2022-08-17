import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpPostClient } from '@/data/protocols/http';

export const mockPostRequest = (url = faker.internet.url()): HttpPostClient.Params<any> => ({
  url,
  body: faker.datatype.json()
})