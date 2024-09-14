'use strict'

const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log(`Error al conectar a la base de datos: ${err}`);
        return;
    }
    console.log('Conexión a la base de datos establecida...');

    // Una vez arrancado el servidor de base de datos arrancamos nuestro servidor de API REST
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });
});
