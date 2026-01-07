console.log("T05 - Ejercicio 03 - Libro");

class Libro {
    #isbn;
    #titulo;
    #generoLiterario;
    #autor; // Array de Objetos Autor
    #precio; // Sin IVA
    // Otras Propiedades
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
        let nombresAutores = "";
        for (const elAutor of this.autor) {
            nombresAutores += elAutor.nombre + "  ";
        }
        return `ISBN: ${this.isbn} | Título: ${this.titulo} | Género: ${this.generoLiterario} | Autores: ${nombresAutores} | Precio: ${this.precio.toFixed(2)}€`
    }

    aplicarDescuentoLibro(descuento) {
        if (descuento < 0 || descuento > 1) throw new Error("Descuento erróneo");
        if (this.#precioOriginal != null) {
            this.deshacerDescuentoLibro();
        }
        this.#precioOriginal = this.precio;
        let nuevoPrecio = this.precio - (this.precio * descuento);
        this.precio = Number(nuevoPrecio.toFixed(2))
    }

    deshacerDescuentoLibro() {
        if (this.#precioOriginal != null) {
            this.precio = this.#precioOriginal;
            this.#precioOriginal = null;
        }
    }

    // Otros métodos que consideres necesarios y sean comunes a los hijos e idénticos.
    static listaGeneros() {
        return [...Libro.GENEROS_LITERARIOS];
    }
}

class Ebook extends Libro {
    #tamanoArchivo; // MiB
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
        return "(Ebook)" + super.mostrarDatosLibro() + ` | Tamaño: ${this.tamanoArchivo} MiB | Formato: ${this.formato}`;
    }

    // Métodos Comunes
    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(mapaInfo) { // Posible clase con fallos
        for (const [clave, valor] of mapaInfo) {
            if (clave == "isbn") {
                continue;
            }
            if (this.hasOwnProperty(clave)) {
                this[clave] = valor;
            }
        }
    }

    // Aquellos otros métodos que consideres necesarios
    static listaFormatos() {
        return [...Ebook.FORMATOS];
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
        return "(Papel)" + super.mostrarDatosLibro() + ` | Dimensiones: ${this.dimensiones} | Peso: ${this.peso} g | Stock: ${this.stock}`;
    }

    // Métodos Comunes
    comprobarDisponibilidad() {
        return this.stock > 0;
    }

    modificarLibro(mapaInfo) { // Posible clase con fallos
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
