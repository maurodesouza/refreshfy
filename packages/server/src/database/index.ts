import {
  PostsStore,
  RefreshTokensStore,
  UsersStore,
  MessagesStore,
} from '../types';

export const users: UsersStore = new Map();

export const posts: PostsStore = new Map();

export const messages: MessagesStore = new Map();

export const tokens: RefreshTokensStore = new Map();
