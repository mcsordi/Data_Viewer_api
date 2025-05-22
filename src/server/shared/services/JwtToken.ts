import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
export type TJwtData = {
    uid: number;
    email: string;
};
export const generate = (data: TJwtData): string | 'TOKEN NÃO ENCONTRADO' => {
    if (!process.env.JWT_TOKEN) {
        return 'TOKEN NÃO ENCONTRADO';
    }
    const sign = jwt.sign(data, process.env.JWT_TOKEN, {
        expiresIn: '24H',
    });
    return sign;
};
export const verify = (
    token: string
): TJwtData | 'TOKEN NÃO ENCONTRADO' | 'TOKEN INVALIDO' => {
    if (!process.env.JWT_TOKEN) {
        return 'TOKEN NÃO ENCONTRADO';
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (typeof decoded != 'object') {
            return 'TOKEN INVALIDO';
        }
        return decoded as TJwtData;
    } catch {
        return 'TOKEN INVALIDO';
    }
};
