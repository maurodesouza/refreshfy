import { Database, Roles } from '../../types';

const seedUsers = (database: Database<'users'>) => {
  database['users'].set('user@user.com', {
    password: '123',
    permissions: ['users.list', 'users.create', 'metrics.list'],
    roles: [Roles.ADMIN],
  });
};

export default seedUsers;
