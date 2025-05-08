import { app } from '.';
import { knexServer } from './server/database/knex';

knexServer.migrate.latest().then(() =>
  knexServer.seed.run().then(() =>
    app.listen(process.env.PORT || 3333, () => {
      console.log(`server running at port ${process.env.PORT || 3333}`);
    }),
  ),
);
