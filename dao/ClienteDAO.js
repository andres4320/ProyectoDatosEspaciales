const mysql = require('mysql');

class ClienteDAO {
    constructor() {
        if (!ClienteDAO.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'datosespaciales'
            });

            // Conectar a la base de datos
            this.connection.connect((err) => {
                if (err) {
                    console.error('Error conectando a la base de datos:', err);
                    return;
                }
                console.log('Conexión a la base de datos establecida');
            });

            ClienteDAO.instance = this;
        }
        return ClienteDAO.instance;
    }

    // Método para obtener todos los clientes
    getAllClients(callback) {
        this.connection.query('SELECT * FROM clientes', callback);
    }

    // Método para agregar un nuevo cliente
    addClient(cliente, callback) {
        this.connection.query('INSERT INTO clientes SET ?', cliente, callback);
    }

    // Método para actualizar un cliente existente
    updateClient(id, updatedCliente, callback) {
        const sql = 'UPDATE clientes SET ? WHERE id = ?';
        this.connection.query(sql, [updatedCliente, id], callback);
    }

    // Método para eliminar un cliente por ID
    deleteClient(id, callback) {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        this.connection.query(sql, [id], callback);
    }
}

// Crear una instancia única y exportarla
const instance = new ClienteDAO();
Object.freeze(instance);

module.exports = instance;
