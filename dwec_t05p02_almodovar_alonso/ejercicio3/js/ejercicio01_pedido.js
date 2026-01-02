class Pedido {
    #id;
    #cliente; // Objeto Cliente
    #librosPedido; // Mapa con isbn del libro pedido y el número de unidades. Solo puede ser 1 si es Ebook. El pedido puede contener tanto libros de tipo Ebook como LibroPapel.
    #fecha;
    #tipoEnvioPedido; // Objeto tipo Envío
    #precioTotalSinEnvioSinIVA; // Coste total de los libros
    #precioTotalConEnvioSinIVA; // precioTotalSinEnvioSinIVA + coste del envío
    #precioTotalConEnvioConIVA; // precioTotalConEnvioSinIVA + iva
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
        if (!Util.validarFecha(valor)) {
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

    mostrarDatosPedido() {
        /*  Devuelve una cadena con toda la información de un pedido, detallando los libros (ebooks y en papel), el tipo de envío y los costes finales. No recibe nada. */
    }

    insertarLibro(libro, unidades) {
        const unidadesFinal = libro instanceof Ebook ? 1 : unidades;
        this.librosPedido.set(libro.isbn, { libro: libro, unidades: unidadesFinal });
        let totalUnidades = 0;
        for (const item of this.librosPedido.values()) {
            totalUnidades += item.unidades;
        }
        return totalUnidades;
    }

    establecerTipoEnvio(tipoEnvio) {
        let seEstablece = false;
        if (this.hayLibros()) {
            let soloEbooks = true;
            let pesoTotal = 0;
            for (const item of this.librosPedido.values()) {
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
        if (this.hayLibros() && this.tipoEnvioPedido != null) {
            let descuentoFinal = 0;
            if (this.fecha.getMonth() == 10 || this.fecha.getMonth() == 11) {
                descuentoFinal = 0.1;
            }
            let costeEnvio = 0;
            let costeTotalLibros = 0;
            let hayLibroPapel = false;
            for (const item of this.librosPedido.values()) {
                const precioUnitario = item.libro.precio - (item.libro.precio * descuentoFinal);
                costeTotalLibros += (precioUnitario * item.unidades);
                if (item.libro instanceof LibroPapel) {
                    hayLibroPapel = true;
                }
            }
            if (hayLibroPapel) {
                costeEnvio = this.tipoEnvioPedido.precio;
            }
            this.precioTotalSinEnvioSinIVA = costeTotalLibros;
            this.precioTotalConEnvioSinIVA = costeTotalLibros + costeEnvio;
            this.precioTotalConEnvioConIVA = costeTotalLibros + costeEnvio + ((costeTotalLibros + costeEnvio) * Tienda.IVA);
        }
    }

    aplicarDescuento(porcentaje) {
        if (this.hayLibros() && this.tipoEnvioPedido != null && porcentaje < 1) {
            let costeEnvio = this.precioTotalConEnvioSinIVA - this.precioTotalSinEnvioSinIVA; //La diferencia entre uno y otro es el coste de envío
            this.precioTotalSinEnvioSinIVA = this.precioTotalSinEnvioSinIVA - (this.precioTotalSinEnvioSinIVA * porcentaje);
            this.precioTotalConEnvioSinIVA = this.precioTotalSinEnvioSinIVA + costeEnvio;
            this.precioTotalConEnvioConIVA = this.precioTotalConEnvioConIVA + (this.precioTotalConEnvioConIVA * Tienda.IVA);
            return true;
        } else {
            return false;
        }
    }
}