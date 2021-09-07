import { v4 as uuid } from 'uuid';
import faker from 'faker';

import { Database } from '../../types';

const messages = (database: Database<'messages'>) => {
  const toGenerate = 25;

  for (let i = 0; i < toGenerate; i++) {
    const text = faker.lorem.words(7);

    database['messages'].set(uuid(), {
      message: text.charAt(0).toLocaleUpperCase() + text.slice(1),
    });
  }
};

export default messages;
