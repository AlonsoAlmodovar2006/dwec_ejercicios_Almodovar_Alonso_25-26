console.log("T05 - Ejercicio 03 - Clientes");

class Clientes {
    #listadoClientes;

    constructor() {
        this.#listadoClientes = [];
    }

    get listadoClientes() {
        return this.#listadoClientes;
    }

    existeClientePorDNI(dniAbuscar) {
        const hayCliente = this.listadoClientes.some((cliente) => cliente.dni == dniAbuscar);
        return hayCliente;
    }

    insertarClientes(clientes) {
        let contador = 0;
        for (const cliente of clientes) {
            if (!this.existeClientePorDNI(cliente)) {
                contador++;
                this.listadoClientes.push(cliente);
            }
        }
        return contador;
    }

    buscarClientePorDNI(dniAbuscar) {
        const miCliente = this.listadoClientes.find((cliente) => cliente.dni == dniAbuscar);
        if (miCliente == undefined) {
            return null;
        } else {
            return miCliente;
        }
    }

    borrarClientePorDNI(dniAborrar) {
        const indexCliente = this.listadoClientes.findIndex((cliente) => cliente.dni = dniAborrar);
        if (indexCliente != -1) {
            this.listadoClientes.splice(indexCliente,1);
        } else {
            return false;
        }
    }

    // No se pueden modificar los clientes

    // Aquellos otros métodos que considere necesarios
    obtenerClientes() {
        let clientes = [];
        for (const cliente of this.listadoClientes) {
            clientes.push(cliente);
        }
        return clientes;
    }
}
