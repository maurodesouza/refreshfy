import { v4 as uuid } from 'uuid';
import faker from 'faker';

import { Database } from '../../types';

const posts = (database: Database<'posts'>) => {
  const toGenerate = 45;

  for (let i = 0; i < toGenerate; i++) {
    const text = faker.lorem.words(7);

    database['posts'].set(uuid(), {
      title: text.charAt(0).toLocaleUpperCase() + text.slice(1),
    });
  }
};

export default posts;
