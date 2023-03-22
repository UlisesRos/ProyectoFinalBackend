const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = generadoJWT = (body) => {

    return new Promise(( res, rec ) => {
        const payload = { body };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                rec("No se pudo generar el token")
            } else {
                res(token)
            }
        })
    });

}