import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const ensureAuth: RequestHandler = (req, res, next) => {
    const bearerToken = req.headers.authorization?.split(' ');
    if (!bearerToken) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ errors: { authentication: 'Usuário não autenticado' } });
    } else if (bearerToken[0] !== 'Bearer') {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ errors: { authentication: 'Usuário não autenticado' } });
    } else if (bearerToken[1] !== 'aaaa.bbbb.cccc.dddd') {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ errors: { authentication: 'Usuário não autenticado' } });
    }
    next();
    console.log('🚀 ~ bearerToken:', bearerToken);
};

export { ensureAuth };
