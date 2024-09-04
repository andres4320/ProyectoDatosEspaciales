const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clienteDAO = require('./dao/ClienteDAO'); // Asegúrate de que la ruta sea correcta

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const cliente = req.body;
    clienteDAO.addClient(cliente, (err, result) => {
        if (err) {
            res.status(500).send('Error al agregar cliente');
        } else {
            res.status(201).send('Cliente agregado con éxito');
        }
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    clienteDAO.getAllClients((err, results) => {
        if (err) {
            res.status(500).send('Error al obtener clientes');
        } else {
            res.json(results);
        }
    });
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const updatedCliente = req.body;
    clienteDAO.updateClient(id, updatedCliente, (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar cliente');
        } else {
            res.send('Cliente actualizado con éxito');
        }
    });
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    clienteDAO.deleteClient(id, (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar cliente');
        } else {
            res.send('Cliente eliminado con éxito');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
