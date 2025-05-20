import { create } from './Create';
import { getAll } from './GetAll';
import { getById } from './GetById';
import { deleteByID } from './Delete';
import { update } from './Update';

import { count } from './Count';

export const cidadeProvider = {
    create,
    getAll,
    count,
    getById,
    deleteByID,
    update,
};
