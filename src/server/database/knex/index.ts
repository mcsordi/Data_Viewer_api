import knex from 'knex';
import { development, production, test } from './Environment';

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
