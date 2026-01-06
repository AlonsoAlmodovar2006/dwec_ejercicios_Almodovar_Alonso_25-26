console.log("T05 - Ejercicio 03 - Cliente");

class Cliente {
    #dni; // Único
    #nombre; // Nombre Completo
    #direccion; // TipoCalle Nombre Nº, Población
    #listaPedidos; // Objeto Pedido

    constructor (id, nom, dir) {
        this.dni = id;
        this.nombre = nom;
        this.direccion = dir;
        this.#listaPedidos = new Pedidos(); 
    }

    get dni() {
        return this.#dni;
    }
    set dni(valor) {
        if (!Util.validarEntero(valor)) {
            throw new Error("DNI Inválido");
        }
        this.#dni = valor;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(valor) {
        if (!Util.validarNombrePersona(valor)) {
            throw new Error("Nombre Inválido");
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

    mostrarDatosCliente() {
        return `(Cliente) ${this.dni} - Nombre: ${this.nombre} | Dirección: ${this.direccion} | Número Pedidos: ${this.listaPedidos.tamanoListaPedidos()} `;
    }

    mostrarPedidosClienteAbierto() { // La primera parte del mensaje debería ir en Tienda
        let mensaje = `PEDIDOS ABIERTOS DEL CLIENTE ${this.dni} \n`;
        for (const pedido of this.listaPedidos) {
            if (pedido.abierto){
                mensaje += pedido.mostrarDatosPedido() + "\n";
            }
        }
        return mensaje;
    }

    insertarPedidoCliente(pedidoAInsertar) {
        this.listaPedidos.insertarPedidos([pedidoAInsertar]);
    }
}
