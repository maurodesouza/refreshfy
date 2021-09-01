import { PostsStore, RefreshTokensStore, UsersStore } from '../types';

export const users: UsersStore = new Map();

export const posts: PostsStore = new Map();

export const tokens: RefreshTokensStore = new Map();
