console.log("T04 - Ejercicio 01");
class Libro {
    #isbn;
    #titulo;
    #generoLiterario;
    #autor; // Array de Objetos Autor
    #precio; // Sin IVA
    #precioOriginal;

    static GENEROS_LITERARIOS = new Set([
        "Novela",
        "Poesía",
        "Ensayo",
        "Teatro",
        "Ciencia Ficción",
        "Fantasía",
        "Histórico",
        "Biografía",
        "Terror",
        "Infantil",
    ]);

    constructor(id, tit, genero, aut, prec) {
        this.isbn = id;
        this.titulo = tit;
        this.generoLiterario = genero;
        this.autor = aut;
        this.precio = prec;
        this.#precioOriginal = null;
    }

    get isbn() {
        return this.#isbn;
    }
    set isbn(valor) {
        if (!Util.validarEntero(valor)) {
            throw new Error("Isbn Inválido");
        }
        this.#isbn = valor;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(valor) {
        if (!Util.validarEntrada(valor)) {
            throw new Error("Título Inválido");
        }
        this.#titulo = valor;
    }

    get generoLiterario() {
        return this.#generoLiterario;
    }
    set generoLiterario(valor) {
        if (!Util.validarGenero(valor, Libro.GENEROS_LITERARIOS)) {
            throw new Error("Género literario Inválido");
        }
        this.#generoLiterario = valor;
    }

    get autor() {
        return this.#autor;
    }
    set autor(valor) {
        if (!Array.isArray(valor)) {
            throw new Error("Formato del Autor Inválido");
        }
        this.#autor = valor;
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

    mostrarDatosLibro() {
        return `Libro ${this.isbn}: ${this.titulo}, ${this.generoLiterario}, ${this.autor.nombre}, ${this.precio} €`;
    }

    aplicarDescuentoLibro(descuento) {
        if (this.#precioOriginal != null) {
            this.deshacerDescuentoLibro();
        }
        this.#precioOriginal = this.precio;
        this.precio = this.precio - this.precio * (descuento / 100);
    }

    deshacerDescuentoLibro() {
        if (this.#precioOriginal != null) {
            this.precio = this.#precioOriginal;
            this.#precioOriginal = null;
        }
    }

    // Algún otro método necesario
    static leerGenerosLiterarios() {
        let mensaje = "";
        let contador = 0;
        Libro.GENEROS_LITERARIOS.forEach(function (valor) {
            mensaje += ++contador + ". " + valor + "\n";
        })
        return mensaje;
    }
}

class Ebook extends Libro {
    #tamanoArchivo; //en MiB
    #formato;

    static FORMATOS = new Set(["pdf", "epub", "mobi"]);

    constructor(isbn, titulo, autor, generoLiterario, precio, tamano, forma) {
        super(isbn, titulo, autor, generoLiterario, precio);
        this.tamanoArchivo = tamano;
        this.formato = forma;
    }

    get tamanoArchivo() {
        return this.#tamanoArchivo;
    }
    set tamanoArchivo(value) {
        if (!Util.validarTamanoArchivo(value)) {
            throw new Error("Tamaño de Archivo Inválido");
        }
        this.#tamanoArchivo = value;
    }

    get formato() {
        return this.#formato;
    }
    set formato(value) {
        if (!Util.validarFormato(value, Ebook.FORMATOS)) {
            throw new Error("Formato Inválido");
        }
        this.#formato = value;
    }

    descargar() {
        return "Descargando...";
    }

    convertirFormato(formato) {
        this.formato = formato;
    }

    mostrarDatosLibro() {
        return `Libro Ebook.${this.formato} ${this.isbn}: ${this.titulo}, ${this.autor.nombre}. ${this.generoLiterario}, ${this.precio} €, ${this.tamanoArchivo} MiB`;
    }

    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(mapaInfo) {
        for (const [clave, valor] of mapaInfo) {
            if (clave == "isbn") {
                continue;
            }
            if (this.hasOwnProperty(clave)) {
                this[clave] = valor;
            }
        }
    }

    // Algún otro método necesario
    static leerFormatos() {
        let mensaje = "";
        let contador = 0;
        Ebook.FORMATOS.forEach(function (valor) {
            mensaje += ++contador + ". " + valor + "\n";
        })
        return mensaje;
    }
}

class LibroPapel extends Libro {
    #peso; // Gramos
    #dimensiones; // Ej: 20x15x3 cm
    #stock;

    static STOCKMINIMO = 3;

    constructor(isbn, titulo, autor, generoLiterario, precio, pes, dimen, stoc) {
        super(isbn, titulo, autor, generoLiterario, precio);
        this.peso = pes;
        this.dimensiones = dimen;
        this.stock = stoc;
    }

    get peso() {
        return this.#peso;
    }
    set peso(value) {
        if (!Util.validarPeso(value)) {
            throw new Error("Peso Inválido");
        }
        this.#peso = value;
    }

    get dimensiones() {
        return this.#dimensiones;
    }
    set dimensiones(value) {
        if (!Util.validarDimensiones(value)) {
            throw new Error("Dimensiones Inválido");
        }
        this.#dimensiones = value;
    }

    get stock() {
        return this.#stock;
    }
    set stock(value) {
        if (!Util.validarStock(value)) {
            throw new Error("Stock Inválido");
        }
        this.#stock = value;
    }

    embalar() {
        return "Embalando...";
    }

    reducirStock() {
        this.stock = this.stock--;
    }

    ampliarStock(numUnidades) {
        this.stock = this.stock + numUnidades;
    }

    avisoStockMinimo() {
        return this.stock < LibroPapel.STOCKMINIMO;
    }

    mostrarDatosLibro() {
        return `Libro en Papel ${this.isbn}: ${this.titulo}, ${this.autor.nombre}. ${this.generoLiterario}, ${this.precio} €. ${this.dimensiones}, ${this.peso} g. Quedan ${this.stock}`;
    }

    comprobarDisponibilidad() {
        return this.stock > 0;
    }

    modificarLibro(mapaInfo) {
        for (const [clave, valor] of mapaInfo) {
            if (clave == "isbn") {
                continue;
            }
            if (this.hasOwnProperty(clave)) {
                this[clave] = valor;
            }
        }
    }
}
