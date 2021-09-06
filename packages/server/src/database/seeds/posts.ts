import { v4 as uuid } from 'uuid';
import faker from 'faker';

import { Database } from '../../types';

const posts = (database: Database<'posts'>) => {
  const toGenerate = 45;

  for (let i = 0; i < toGenerate; i++) {
    database['posts'].set(uuid(), {
      title: faker.lorem.words(7),
    });
  }
};

export default posts;
