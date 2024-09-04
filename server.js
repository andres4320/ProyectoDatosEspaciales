const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ClienteController = require('./controllers/ClienteController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conectar rutas
app.use('/clientes', ClienteController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
