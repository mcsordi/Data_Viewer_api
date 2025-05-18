import { app } from './index';
import * as dotenv from 'dotenv';
import { Knex } from './server/database/knex';
dotenv.config();

const startServer = () => {
    return app.listen(process.env.PORT || 3333, () =>
        console.log(`App running at the port ${process.env.PORT || 3333}`)
    );
};

if (process.env.IS_LOCAL_HOST != 'true') {
    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed
                .run()
                .then(() => {
                    startServer();
                })
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}
