'use strict'

const services = require('../services');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' });
    }
    // Viene con el texto "Beaver" al principio "Beaver <token>"
    console.log('req.headers.authorization:' + req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];

    // Viene sin el texto "Beaver" al principio "<token>"
    //const token = req.headers.authorization;

    services.decodeToken(token)
        .then(response => {
            req.user = response;
            // Pasamos al siguiente middleware
            next();
        })
        .catch(response => {
            res.status(response.status);
        });
}

module.exports = isAuth;
