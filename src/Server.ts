import { app } from '.';
import { Knex } from './server/database/knex';

const startServer = () => {
  app.listen(process.env.PORT || 3333, () => {
    console.log(`server running at port ${process.env.PORT || 3333}`);
  });
};

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
