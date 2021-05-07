const checkFields = require('./checkFields');
const jwt = require('jsonwebtoken');

const verifyJWT = (context, payload) => {
    try {
        const { authorization } = context.request.headers;
        if (!checkFields(authorization)) {
            return new Error("401: User is not authenticated");
        }
        const verifyToken = jwt.verify(authorization, process.env.SECRET_KEY_FOR_USER);
        if (!verifyToken.id) {
            return new Error("401: User is not authenticated");
        }
        return payload();
    } catch (error) {
        return new Error("401: User is not authenticated");
    }
}

module.exports = { verifyJWT };