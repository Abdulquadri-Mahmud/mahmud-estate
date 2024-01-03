import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // accessing token
    const token = req.cookies.access_token;
    // check if token is not available
    if (!token) {
        return next(errorHandler(404, 'Unauthorized!'));
    }
    // verifying token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden!'));
        }
        // if token macthed
        req.user = user;
        next();
    });
}