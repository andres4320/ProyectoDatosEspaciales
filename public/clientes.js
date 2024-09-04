document.addEventListener('DOMContentLoaded', function() {
    fetch('/clientes')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('clientes-container');

            if (data.length > 0) {
                const tableHtml = `
                    <table class="table text-center">
                        <thead>
                            <tr class="table-dark">
                                <th scope="col">Cédula</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Ubicación</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(cliente => `
                                <tr>
                                    <td>${cliente.cedula}</td>
                                    <td>${cliente.nombres}</td>
                                    <td>${cliente.apellidos}</td>
                                    <td>${cliente.direccion}</td>
                                    <td>${cliente.ubicacion_lat}, ${cliente.ubicacion_lng}</td>
                                    <td>
                                        <div class="btn-group">
                                            <a href="/editar/${cliente.id}" class="btn btn-warning p-2">
                                                <i class="fa-solid fa-pencil"></i>
                                            </a>
                                            <a href="#" class="btn btn-danger p-2" onclick="deleteClient(${cliente.id})">
                                                <i class="fa-solid fa-trash"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="table-dark">
                                <td colspan="6">Registro de Clientes</td>
                            </tr>
                        </tfoot>
                    </table>
                `;
                container.innerHTML = tableHtml;
            } else {
                container.innerHTML = `
                    <div class="card text-center mx-auto" style="width: 350px;">
                        <div class="card-header">
                            <h3>Debes crear un Cliente</h3>
                        </div>
                        <div>
                            <p>Presione este botón para que puedas registrar un cliente en la aplicación.</p>
                            <a href="/index.html" class="btn btn-primary">Ir a crear</a>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
});

function deleteClient(id) {
    fetch(`/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Cliente eliminado');
            location.reload();
        } else {
            alert('Error al eliminar el cliente');
        }
    })
    .catch(error => console.error('Error:', error));
}
