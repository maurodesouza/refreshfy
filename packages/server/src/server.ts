import express from 'express';
import cors from 'cors';

import { seedUserStore } from './database';
import { routes } from './routes';

const app = express();
seedUserStore();

app.use(express.json());
app.use(cors());

app.use(routes);
app.listen(3333);
