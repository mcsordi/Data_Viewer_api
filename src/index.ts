import express from 'express';
import { router } from './server/shared/routes';
export const app = express();

app.use(express.json());
app.use(router);
