import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtService } from '../services';

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
    }
    const verifyToken = jwtService.verify(bearerToken[1]);

    if (verifyToken == 'TOKEN INVALIDO') {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ errors: { authentication: 'Usuário não autenticado' } });
    } else if (verifyToken == 'TOKEN NÃO ENCONTRADO') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { authentication: 'token não encontrado' } });
    }
    req.headers.userId = verifyToken.uid.toString();
    req.headers.userEmail = verifyToken.email;

    return next();
};

export { ensureAuth };
