import { v4 as uuid } from 'uuid';
import faker from 'faker';

import { Database } from '../../types';

const sales = (database: Database<'sales'>) => {
  const toGenerate = 68;

  for (let i = 0; i < toGenerate; i++) {
    database['sales'].set(uuid(), {
      price: faker.random.arrayElement([9.9, 19.9, 29.9]),
      product: faker.random.arrayElement(['signature']),
      client: faker.name.firstName(),
    });
  }
};

export default sales;
