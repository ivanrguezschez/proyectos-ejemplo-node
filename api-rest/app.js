'use strict'

// POR EL VIDEO 12

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const api = require('./routes'); // por defecto busca un archivo 'index.js'

const app = express();

// Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware parse application/json
app.use(bodyParser.json());

// Configurar el motor de plantillas para renderizar html (express por defecto va a buscar las vistas en una carpeta "view")
app.engine('.hbs', hbs({ defaultLayout: false, extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use('/api', api);

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/product', (req, res) => {
    res.render('product');
});

module.exports = app;
