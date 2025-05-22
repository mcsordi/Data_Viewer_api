import * as bcrypt from 'bcryptjs';

export const encrypt = async (pass: string) => {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
};

export const decrypt = async (pass: string, hash: string) => {
    const compare = await bcrypt.compare(pass, hash);
    return compare;
};
