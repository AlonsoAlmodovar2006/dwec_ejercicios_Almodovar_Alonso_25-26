console.log("T04 - Ejercicio 01 - Cliente");

class Cliente {
    #dni;
    #nombre; // Nombre Completo
    #direccion;
    #listaPedidos; // Array de Objetos Pedido

    constructor (id, nom, dir, pedidos) {
        this.dni = id;
        this.nombre = nom;
        this.direccion = dir;
        this.listaPedidos = pedidos; 
    }

    get dni() {
        return this.#dni;
    }
    set dni(valor) {
        if (!Util.validarEntero(valor)) {
            throw new Error("dni Inválido");
        }
        this.#dni = valor;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("nombre Inválido");
        }
        this.#nombre = valor;
    }

    get direccion() {
        return this.#direccion;
    }
    set direccion(valor) {
        if (!Util.validarEntrada(valor)) {
            throw new Error("Dirección Inválida");
        }
        this.#direccion = valor;
    }

    get listaPedidos() {
        return this.#listaPedidos;
    }
    set listaPedidos(valor) {
        if (!Array.isArray(valor)) {
            throw new Error("Formato de listaPedidos Inválido");
        }
        this.#listaPedidos = valor;
    }

    mostrarDatosCliente() {
        return `(Cliente) ${this.dni} - Nombre: ${this.nombre} | Dirección: ${this.direccion} | Número Pedidos: ${this.listaPedidos.length} `;
    }

    mostrarPedidosClienteAbierto() {
        let mensaje = `PEDIDOS ABIERTOS DEL CLIENTE ${this.dni} \n`;
        for (const pedido of this.listaPedidos) {
            if (pedido.abierto){
                mensaje += pedido.mostrarDatosPedido() + "\n";
            }
        }
        return mensaje;
    }

    insertarPedidoCliente(pedidoAInsertar) {
        this.listaPedidos.push(pedidoAInsertar);
    }
}
