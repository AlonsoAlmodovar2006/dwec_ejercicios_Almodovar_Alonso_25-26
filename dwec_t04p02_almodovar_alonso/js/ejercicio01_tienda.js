console.log("T04 - Ejercicio 01");
class Tienda {
    #libros; // Objeto Libros
    #autores; // Objeto Autores
    #tiposEnvios; // Objeto Tipos de Envío
    #clientes; // Objeto Clientes
    #pedidos; // Objeto Pedidos
    #nombre; // Nombre de la tienda
    #lector; // Objeto leerDatosPrompt

    static instancia = null;
    static IVA = 0.04;

    static getInstancia(nombreTienda) {
        if (Tienda.instancia === null) {
            Tienda.instancia = new Tienda(nombreTienda);
        }
        return Tienda.instancia;
    }

    constructor(nombreTienda) {
        if (Tienda.instancia !== null) {
            throw new Error("Use Tienda.getInstancia() en lugar de new Tienda()");
        }
        this.libros = new Libros();
        this.autores = new Autores();
        this.tiposEnvios = new TiposEnvios();
        this.clientes = new Clientes();
        this.pedidos = new Pedidos();
        this.nombre = nombreTienda;
        this.lector = new leerDatosPrompt();
    }

    get libros() {
        return this.#libros;
    }
    set libros(valor) {
        if (!(valor instanceof Libros)) {
            throw new Error("Libros Inválido");
        }
        this.#libros = valor;
    }

    get autores() {
        return this.#autores;
    }
    set autores(valor) {
        if (!(valor instanceof Autores)) {
            throw new Error("Autores Inválido");
        }
        this.#autores = valor;
    }

    get tiposEnvios() {
        return this.#tiposEnvios;
    }
    set tiposEnvios(valor) {
        if (!(valor instanceof TiposEnvios)) {
            throw new Error("TiposEnvios Inválido");
        }
        this.#tiposEnvios = valor;
    }

    get clientes() {
        return this.#clientes;
    }
    set clientes(valor) {
        if (!(valor instanceof Clientes)) {
            throw new Error("Clientes Inválido");
        }
        this.#clientes = valor;
    }

    get pedidos() {
        return this.#pedidos;
    }
    set pedidos(valor) {
        if (!(valor instanceof Pedidos)) {
            throw new Error("Pedidos Inválido");
        }
        this.#pedidos = valor;
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

    get lector() {
        return this.#lector;
    }
    set lector(valor) {
        if (!(valor instanceof leerDatosPrompt)) {
            throw new Error("leerDatosPrompt Inválido");
        }
        this.#lector = valor;
    }

    cargarDatosPrueba() {
        const autores = [new Autor("Brandon Sanderson"), new Autor("J.K. Rowling"), new Autor("Miguel de Cervantes")];
        this.autores.insertarAutores(autores);

        const libros = [new LibroPapel("978-84-1", "El Archivo de las Tormentas",  [autores[0]], "Fantasía Épica", 25.00, 1200, "25x15x5", 50),
            new LibroPapel("978-84-2", "Don Quijote",  [autores[2]], "Clásico", 15.50, 500, "20x13x3", 20),
            new Ebook("978-84-3", "Harry Potter y la Piedra Filosofal", [autores[1]], "Fantasía Juvenil",  9.99, 101, "epub")];
        this.libros.insertarLibros(libros);

        autores[0].insertarLibro(libros[0]);
        autores[1].insertarLibro(libros[2]);
        autores[2].insertarLibro(libros[1]);

        const envios = [new TipoEnvio("Estándar", 3, 2000, 4.99),
            new TipoEnvio("Urgente 24h", 1, 5000, 9.99),
            new TipoEnvio("Gran Volumen", 5, 20000, 19.99)];
        this.tiposEnvios.insertarTipos(envios);

        const clientes = [new Cliente("12345678A", "Alonso Almodóvar", "Calle Mayor 1, Valdepeñas", []),
            new Cliente("87654321B", "Carlos Pérez", "Av. Diagonal 20, Barcelona", [])];
        this.clientes.insertarClientes(clientes);

        const pedidos = [new Pedidos(clientes[0]), new Pedidos(clientes[1])];

        clientes[0].listaPedidos.push(pedidos[0]);
        clientes[1].listaPedidos.push(pedidos[1]);

        pedidos[0]
    }

    // función mostrarMenu()

    iniciar() {
        mostrarMenu();
    }
}


