import 'dotenv/config';
import knex from 'knex';
import { development, production, test } from './Environment';
import pg from 'pg';

if (process.env.NODE_ENV == 'production') {
    pg.types.setTypeParser(20, 'text', parseInt);
}

const selectEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'development': {
            return development;
        }
        case 'test': {
            return test;
        }
        default: {
            return production;
        }
    }
};

const Knex = knex(selectEnvironment());

export { Knex };
