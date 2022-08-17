import { faker } from '@faker-js/faker/locale/pt_BR';
import axios from "axios";

export const mockHttpResponse = (): any => ({
  data: faker.datatype.json(),
  status: faker.datatype.number({ min: 200, max: 511 })
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios;
}