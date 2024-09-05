const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ClienteController = require('./controllers/ClienteController');
// const ClienteDAO = require('./dao/ClienteDAO'); // Asegúrate de tener el archivo ClienteDAO.js

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conectar rutas de ClienteController
app.use('/clientes', ClienteController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});