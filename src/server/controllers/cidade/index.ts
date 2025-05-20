import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetByID';
import * as update from './Update';
import * as deleteById from './Delete';

export const cidadeController = {
    ...create,
    ...getAll,
    ...getById,
    ...update,
    ...deleteById,
};
