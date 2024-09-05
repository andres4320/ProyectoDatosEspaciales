const express = require('express');
const router = express.Router();
const ClienteDAO = require('../dao/ClienteDAO');
const ClienteDTO = require('../dtos/ClienteDTO');

// Ruta para agregar un nuevo cliente
router.post('/', async (req, res) => {
    try {
        const { cedula, nombres, apellidos, direccion, ubicacion } = req.body;

        // Descomponer la propiedad `ubicacion` en latitud y longitud
        const [ubicacion_lat, ubicacion_lng] = ubicacion.split(',').map(coord => parseFloat(coord.trim()));

        // Crear una instancia de ClienteDTO con los valores descompuestos
        const cliente = new ClienteDTO(cedula, nombres, apellidos, direccion, ubicacion_lat, ubicacion_lng);

        // Guardar el cliente en la base de datos
        ClienteDAO.addClient(cliente, (err, result) => {
            if (err) {
                console.error('Error al agregar cliente:', err);
                res.status(500).send('Error al agregar cliente');
            } else {
                res.status(201).send('Cliente agregado con éxito');
            }
        });
    } catch (err) {
        console.error('Error al agregar cliente:', err);
        res.status(500).send('Error al agregar cliente');
    }
});

// Obtener todos los clientes
router.get('/', (req, res) => {
    ClienteDAO.getAllClients((err, results) => {
        if (err) {
            console.error('Error al obtener los clientes:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// // Obtener cliente por ID
// router.get('/:id', async (req, res) => {
//     try {
//         const cliente = await ClienteDAO.getClienteById(req.params.id);
//         if (cliente) {
//             res.json(cliente);
//         } else {
//             res.status(404).send('Cliente no encontrado');
//         }
//     } catch (error) {
//         res.status(500).send('Error del servidor');
//     }
// });

// Actualizar un cliente existente
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedCliente = req.body;
    ClienteDAO.updateClient(id, updatedCliente, (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar cliente');
        } else {
            res.send('Cliente actualizado con éxito');
        }
    });
});

// // Actualizar cliente
// router.put('/:id', async (req, res) => {
//     try {
//         const clienteActualizado = await ClienteDAO.updateCliente(req.params.id, req.body);
//         if (clienteActualizado) {
//             res.status(200).send('Cliente actualizado con éxito');
//         } else {
//             res.status(404).send('Cliente no encontrado');
//         }
//     } catch (error) {
//         res.status(500).send('Error del servidor');
//     }
// });

// Ruta para obtener un cliente por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    ClienteDAO.getClientById(id, (err, results) => {
        if (err) {
            return res.status(500).send('Error obteniendo cliente');
        }
        if (results.length === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(results[0]); // Enviar el primer cliente encontrado
    });
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    ClienteDAO.deleteClient(id, (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar cliente');
        } else {
            res.send('Cliente eliminado con éxito');
        }
    });
});

// // Ruta para servir la página de edición
// router.get('/editar/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/editar.html'));
// });

// // Ruta para obtener todos los clientes ordenados por distancia
// router.get('/por-distancia', async (req, res) => {
//     const { lat, lng } = req.query;
//     try {
//         const clientes = await new Promise((resolve, reject) => {
//             clienteDAO.getAllClients((err, results) => {
//                 if (err) reject(err);
//                 else resolve(results);
//             });
//         });

//         // Calcular distancia y ordenar los clientes
//         clientes.sort((a, b) => {
//             const distA = calcularDistancia(lat, lng, a.ubicacion_lat, a.ubicacion_lng);
//             const distB = calcularDistancia(lat, lng, b.ubicacion_lat, b.ubicacion_lng);
//             return distA - distB;
//         });

//         res.json(clientes);
//     } catch (err) {
//         console.error('Error al obtener clientes:', err);
//         res.status(500).send('Error al obtener clientes');
//     }
// });

// // Función para calcular la distancia entre dos puntos geográficos
// function calcularDistancia(lat1, lng1, lat2, lng2) {
//     const rad = (x) => (x * Math.PI) / 180;
//     const R = 6371; // Radio de la Tierra en km
//     const dLat = rad(lat2 - lat1);
//     const dLng = rad(lng2 - lng1);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
//         Math.sin(dLng / 2) * Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distancia en km
//     return d;
// }

// Exporta el router
module.exports = router;
