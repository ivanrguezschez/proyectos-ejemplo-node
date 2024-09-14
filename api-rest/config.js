'use strict'

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/test-apirest-shop',
    // El "secret" empleado para generar el jwt nunca debe viajar al cliente, siempre debe permanecer en el servidor, suele ser un código mas dificil de descifrar
    secret_token: 'miclavedetokens'
};
