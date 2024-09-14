'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {
    const payload = {
        // No deberia ser el id de la tabla de la base de datos, sino algún tipo de id público, por ejemplo el email
        // aqui para no complicarlo empleamos el id de la base de datos generado por mongoose
        sub: user._id,
        iat: moment().unix(), 
        exp: moment().add(14, 'days').unix()  // Caduca a los 14 días
    };

    return jwt.encode(payload, config.secret_token);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.secret_token);
            if (payload.exp <= moment().unix()) {
                reject({ status: 401, message: 'Token expirado'});
            } 

            resolve(payload.sub);
        } catch (err) {
            reject({ status: 500, message: 'Invalid Token'});
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};