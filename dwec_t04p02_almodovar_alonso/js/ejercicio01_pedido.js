console.log("T04 - Ejercicio 01 - Pedido");

class Pedido {
    #id;
    #cliente; // Objeto Cliente
    #librosPedido; // Mapa con el Objeto del Libro/s Pedido/s y el nº de unidades (Solo puede ser 1 si es Ebook) El pedido puede contener tanto libros de tipo Ebook como LibroPapel.
    #fecha;
    #tipoEnvioPedido; // Objeto tipoEnvío
    #precioTotalSinEnvioSinIVA; // Coste total de los libros
    #precioTotalConEnvioSinIVA; // precioTotalSinEnvioSinIVA + coste del envío
    #precioTotalConEnvioConIVA; // precioTotalConEnvioSinIVA + IVA
    #descuento;
    #abierto;

    static ultimoId = 0;

    static obtenerSiguienteId() {
        this.ultimoId++;
        return this.ultimoId;
    }

    constructor(clien) {
        this.#id = Pedido.obtenerSiguienteId();
        this.cliente = clien;
        this.librosPedido = new Map([]);
        this.fecha = new Date();
        this.tipoEnvioPedido = null;
        this.precioTotalSinEnvioSinIVA = 0;
        this.precioTotalConEnvioSinIVA = 0;
        this.precioTotalConEnvioConIVA = 0; // Campo calculado. ¿Cambiar?
        this.descuento = 0;
        this.abierto = true;
    }

    get id() {
        return this.#id;
    }

    get cliente() {
        return this.#cliente;
    }
    set cliente(valor) {
        if (!(valor instanceof Cliente)) {
            throw new Error("Cliente Inválido");
        }
        this.#cliente = valor;
    }

    get librosPedido() {
        return this.#librosPedido;
    }
    set librosPedido(valor) {
        if (!(valor instanceof Map)) {
            throw new Error("librosPedido Inválido");
        }
        this.#librosPedido = valor;
    }

    get fecha() {
        return this.#fecha;
    }
    set fecha(valor) {
        if (!Util.validarConvertirFecha(valor)) {
            throw new Error("Fecha Inválido");
        }
        this.#fecha = valor;
    }

    get tipoEnvioPedido() {
        return this.#tipoEnvioPedido;
    }
    set tipoEnvioPedido(valor) {
        if (!(valor instanceof TipoEnvio) && valor !== null) {
            throw new Error("tipoEnvioPedido Inválido");
        }
        this.#tipoEnvioPedido = valor;
    }

    get precioTotalSinEnvioSinIVA() {
        return this.#precioTotalSinEnvioSinIVA;
    }
    set precioTotalSinEnvioSinIVA(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("precioTotalSinEnvioSinIVA Inválido");
        }
        this.#precioTotalSinEnvioSinIVA = valor;
    }

    get precioTotalConEnvioSinIVA() {
        return this.#precioTotalConEnvioSinIVA;
    }
    set precioTotalConEnvioSinIVA(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("precioTotalConEnvioSinIVA Inválido");
        }
        this.#precioTotalConEnvioSinIVA = valor;
    }

    get precioTotalConEnvioConIVA() {
        return this.#precioTotalConEnvioConIVA;
    }
    set precioTotalConEnvioConIVA(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("precioTotalConEnvioConIVA Inválido");
        }
        this.#precioTotalConEnvioConIVA = valor;
    }

    get descuento() {
        return this.#descuento;
    }
    set descuento(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("descuento Inválido");
        }
        this.#descuento = valor;
    }

    get abierto() {
        return this.#abierto;
    }
    set abierto(valor) {
        if (typeof valor !== 'boolean') {
            throw new Error("abierto Inválido");
        }
        this.#abierto = valor;
    }

    hayLibros() {
        return this.librosPedido.size > 0;
    }

    mostrarDatosPedido(catalogoLibro) {
        let tablaLibros = "";
        this.librosPedido.forEach((item) => {
            const tipo = (item.libro instanceof Ebook) ? "Ebook" : "Papel";
            tablaLibros += `\n    - (${tipo}) ${item.libro.titulo} x${item.unidades}`;
        });
        const envioStr = this.tipoEnvioPedido ? this.tipoEnvioPedido.nombre : "Sin envío";
        return `(Pedido) ${this.id} - ${this.cliente.nombre} | Libros Pedidos: ${tablaLibros} | Fecha: ${this.fecha} | ${envioStr} | Precio Libros: ${this.precioTotalSinEnvioSinIVA.toFixed(2)}€ | Precio Libros con Envío: ${this.precioTotalConEnvioSinIVA.toFixed(2)}€ | Precio Total: ${this.precioTotalConEnvioConIVA.toFixed(2)}€ | Descuento: ${this.descuento * 100}% | ${this.abierto ? "Abierto" : "Cerrado"} `;
    }

    insertarLibro(libro, unidades) {
        const unidadesFinal = libro instanceof Ebook ? 1 : unidades;
        this.librosPedido.set(libro.isbn, { libro: libro, unidades: unidadesFinal });
        let totalUnidades = 0;
        for (let item of this.librosPedido.values()) {
            totalUnidades += item.unidades;
        }
        return totalUnidades;
    }

    establecerTipoEnvio(tipoEnvio) {
        let seEstablece = false;
        if (this.hayLibros()) {
            let soloEbooks = true;
            let pesoTotal = 0;
            for (let item of this.librosPedido.values()) {
                if (item.libro instanceof LibroPapel) {
                    soloEbooks = false;
                    pesoTotal += (item.libro.peso * item.unidades);
                }
            }
            if (!soloEbooks && pesoTotal <= tipoEnvio.maxPeso) {
                this.tipoEnvioPedido = tipoEnvio;
                seEstablece = true;
            }
        }
        return seEstablece;
    }

    calcularTotal() {
        let costeEnvio = 0;
        let costeTotalLibros = 0;
        if (this.hayLibros()) {
            let descuentoMes = 0;
            if (this.fecha.getMonth() == 10 || this.fecha.getMonth() == 11) {
                descuentoMes = 0.1;
            }
            let hayLibroPapel = false;
            for (const item of this.librosPedido.values()) {
                const precioUnitario = item.libro.precio - (item.libro.precio * descuentoMes);
                costeTotalLibros += (precioUnitario * item.unidades);
                if (item.libro instanceof LibroPapel) {
                    hayLibroPapel = true;
                }
            }
            if (hayLibroPapel && this.tipoEnvioPedido !== null) {
                costeEnvio = this.tipoEnvioPedido.precio;
            }
        }
        this.precioTotalSinEnvioSinIVA = costeTotalLibros;
        this.precioTotalConEnvioSinIVA = costeTotalLibros + costeEnvio;
        this.precioTotalConEnvioConIVA = costeTotalLibros + costeEnvio + ((costeTotalLibros + costeEnvio) * Tienda.IVA);
    }

    aplicarDescuento(porcentaje) {
        let costeEnvio = 0;
        if (this.hayLibros() && porcentaje < 1 && porcentaje > 0) {
            this.descuento = porcentaje;
            if (this.tipoEnvioPedido !== null) {
                costeEnvio = this.tipoEnvioPedido.precio
            }
            this.precioTotalSinEnvioSinIVA = this.precioTotalSinEnvioSinIVA - (this.precioTotalSinEnvioSinIVA * this.descuento);
            this.precioTotalConEnvioSinIVA = this.precioTotalSinEnvioSinIVA + costeEnvio;
            this.precioTotalConEnvioConIVA = this.precioTotalConEnvioSinIVA + (this.precioTotalConEnvioSinIVA * Tienda.IVA);
            return true;
        } else {
            return false;
        }
    }
}