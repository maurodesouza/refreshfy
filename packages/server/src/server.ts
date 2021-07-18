import express from 'express';
import cors from 'cors';

import { seedUserStore } from './database';
const app = express();
seedUserStore();

app.use(express.json());
app.use(cors());

app.listen(3333);
