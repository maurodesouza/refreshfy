import faker from 'faker';
import {
  PostsStore,
  RefreshTokensStore,
  UsersStore,
  MessagesStore,
  SalesStore,
} from '../types';

faker.locale = 'pt_BR';

export const users: UsersStore = new Map();

export const posts: PostsStore = new Map();

export const sales: SalesStore = new Map();

export const messages: MessagesStore = new Map();

export const tokens: RefreshTokensStore = new Map();
