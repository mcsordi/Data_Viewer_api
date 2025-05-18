import { app } from './index';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT || 3333, () =>
    console.log(`App running at the port ${process.env.PORT || 3333}`)
);
