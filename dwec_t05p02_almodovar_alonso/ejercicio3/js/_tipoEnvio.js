console.log("T04 - Ejercicio 01 - Tipo Envío");

class TipoEnvio {
    #nombre;
    #maxDias;
    #maxPeso;
    #precio; // Sin IVA

    constructor (nom, dias, peso, prec) {
        this.nombre = nom;
        this.maxDias = dias;
        this.maxPeso = peso;
        this.precio = prec;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(valor) {
        if (!Util.validarEntrada(valor)) {
            throw new Error("Nombres Inválido");
        }
        this.#nombre = valor;
    }

    get maxDias() {
        return this.#maxDias;
    }
    set maxDias(valor) {
        if (!Util.validarDiasEnvio(valor)) {
            throw new Error("maxDias Inválido");
        }
        this.#maxDias = valor;
    }

    get maxPeso() {
        return this.#maxPeso;
    }
    set maxPeso(valor) {
        if (!Util.validarPeso(valor)) {
            throw new Error("maxPeso Inválido");
        }
        this.#maxPeso = valor;
    }

    get precio() {
        return this.#precio;
    }
    set precio(valor) {
        if (!Util.validarPrecio(valor)) {
            throw new Error("Precio Inválido");
        }
        this.#precio = valor;
    }

    mostrarDatosTipoEnvio() {
        return `(Tipo Envío) - Nombre: ${this.nombre} | Máximo Días: ${this.maxDias} | Máximo Peso: ${this.maxPeso} | Precio: ${this.precio} €`;
    }

    // Aquellos métodos que consideres necesarios.
}
