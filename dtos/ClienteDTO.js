class ClienteDTO {
    constructor(cedula, nombres, apellidos, direccion, ubicacion_lat, ubicacion_lng) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.ubicacion_lat = ubicacion_lat;
        this.ubicacion_lng = ubicacion_lng;
    }
}

module.exports = ClienteDTO;
