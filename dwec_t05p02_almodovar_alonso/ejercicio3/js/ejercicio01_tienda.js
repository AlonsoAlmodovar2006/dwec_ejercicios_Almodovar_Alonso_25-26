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
        this.lector = new LeerDatosPrompt();
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
        if (!(valor instanceof LeerDatosPrompt)) {
            throw new Error("leerDatosPrompt Inválido");
        }
        this.#lector = valor;
    }

    cargarDatosPrueba() {
        const autores = [new Autor("Brandon Sanderson"), new Autor("Joanne Rowling"), new Autor("Miguel Cervantes")];
        this.autores.insertarAutores(autores);

        const libros = [new LibroPapel("978841", "El Archivo de las Tormentas", "Fantasía", [autores[0]], 25.00, 1200, "25x15x5", 50),
        new LibroPapel("978842", "Don Quijote", "Novela", [autores[2]], 15.50, 500, "20x13x3", 20),
        new Ebook("978843", "Harry Potter y la Piedra Filosofal", "Fantasía", [autores[1]], 9.99, 101.3, "epub")];
        this.libros.insertarLibros(libros);

        autores[0].insertarLibro(libros[0]);
        autores[1].insertarLibro(libros[2]);
        autores[2].insertarLibro(libros[1]);

        const envios = [new TipoEnvio("Estándar", 3, 2000, 4.99),
        new TipoEnvio("Urgente 24h", 1, 5000, 9.99),
        new TipoEnvio("Gran Volumen", 5, 20000, 19.99)];
        this.tiposEnvios.insertarTipos(envios);

        const clientes = [new Cliente("12345678", "Alonso Almodóvar", "Calle Mayor 1, Valdepeñas", []),
        new Cliente("87654321", "Carlos Pérez", "Av. Diagonal 20, Barcelona", [])];
        this.clientes.insertarClientes(clientes);

        const pedidos = [new Pedido(clientes[0]), new Pedido(clientes[1])];
        this.pedidos.insertarPedidos(pedidos);

        clientes[0].insertarPedidoCliente(pedidos[0]);
        clientes[1].insertarPedidoCliente(pedidos[1]);

        pedidos[0].insertarLibro(libros[2], 1);
        pedidos[0].calcularTotal();

        pedidos[1].insertarLibro(libros[1], 1);
        libros[1].reducirStock();
        pedidos[1].establecerTipoEnvio(envios[0]);
        pedidos[1].calcularTotal();
    }

    pedirOpcionMenu() {
        let opcion = this.lector.leerEnteroEntreHasta(this.mostrarMenu(), 1, 11);
        switch (opcion) {
            case "1":
                let cadenaLibros = this.mostrarCatalogoLibrosDisponibles();
                console.log(cadenaLibros);
                break;
            case "2":
                const isbn = this.lector.leerEntero("Dame el ISBN del libro");
                if (this.libros.existeLibroPorIsbn(isbn)) {
                    const libroAModificar = this.libros.buscarLibroPorIsbn(isbn);
                    // Modificar libro 
                } else {
                    const miLibro = this.pedirYCrearLibro(isbn);
                    console.log(miLibro);
                }
                break;
            case "3":
                const nuevoStock = this.actualizarStockLibros();
                console.log(nuevoStock);
                break;
            case "4":
                const librosStockMinimo = this.notificacionesStockLibrosMinimo();
                console.log(librosStockMinimo);
                break;
            case "11": 
                console.log("Adiós!!");
                break;
            default:
                console.log("jaaj");
        }
    }

    pedirYCrearLibro(isbn) {
        let libroCreado = null;
        const titulo = this.lector.leerCadenaHasta("Dame el título del libro");
        const generoLiterario = this.lector.leerCadenaHasta("Escribe el género del libro entre estos: \n" + Libro.leerGenerosLiterarios());
        const numAutor = this.lector.leerEnteroEntreHasta("Elige el autor del libro: \n" + this.autores.obtenerAutores() + "\n 0. Crear Autor", 0, this.autores.tamanoListaAutores());
        let autor = [];
        if (numAutor == 0) {
            const primerAutor = this.pedirYCrearAutor();
            autor.push(primerAutor);
        } else {
            autor.push(this.autores.buscarAutorPorID(numAutor));
        }
        const precio = this.lector.leerRealHasta(`Dame el precio de ${titulo}`);
        const tipo = this.lector.leerEnteroEntreHasta("Elige el tipo de libro que es: \n=====\n 1. Ebook\n 2. Libro de Papel", 1, 2);
        if (tipo == 1) {
            const formato = this.lector.leerCadenaHasta("Escribe el formato del Ebook entre estos: \n" + Ebook.leerFormatos());
            const tamanoArchivo = this.lector.leerRealHasta("Dame el tamaño del Ebook en MiB");
            libroCreado = new Ebook (isbn, titulo, generoLiterario, autor, precio, tamanoArchivo, formato);
        } else if (tipo == 2) {
            const dimensiones = this.lector.leerCadenaHasta("Dame las dimensiones del libro. Ej: (20x30x40)");
            const peso = this.lector.leerEnteroHasta("Dame el peso del libro");
            const stock = this.lector.leerEnteroHasta("Dame el stock del libro");
            libroCreado = new LibroPapel (isbn, titulo, generoLiterario, autor, precio, peso, dimensiones, stock);
        } else {
            throw new Error ("Instancia Tipo mal creada")
        }
        return libroCreado;
    }

    // pedirYCrearVariosLibros

    pedirYCrearAutor() {
        const nombre = this.lector.leerCadenaHasta("Dame el nombre del autor");
        return new Autor (nombre);
    }

    // pedirYCrearVariosAutores

    // pedirYCrearCliente

    // pedirYCrearVariosClientes

    // pedirYCrearTipoEnvio

    // pedirYCrearVariosTiposEnvio

    mostrarCatalogoLibrosDisponibles() {
        return this.libros.obtenerCadenaLibrosMenu();
    }

    actualizarStockLibros() {
        // Stock de un Libro aunque en el ejercicio pedía más (creo)
        const tituloLibro = this.lector.leerCadenaHasta("Dame el título del libro a modificar: \n" + this.mostrarCatalogoLibrosDisponibles());
        const libro = this.libros.buscarLibroPorTitulo(tituloLibro);
        if (libro.length > 0 && libro[0] instanceof LibroPapel) {
            const numStock = this.lector.leerEnteroHasta("Dame el stock a añadir del libro");
            libro[0].ampliarStock(numStock);
        } else {
            console.log("El titulo que indicas no existe o es un Ebook");
        }
        return libro[0]
    }

    notificacionesStockLibrosMinimo() {
        let mensaje = "LIBROS CON BAJO STOCK\n=====\n";
        let contador = 0;
        for (const libro of this.libros.listadoLibros) {
            if (libro instanceof LibroPapel && libro.avisoStockMinimo()) {
                mensaje += ++contador + ". " + libro.titulo;
            }
        }
        return mensaje;
    }

    mostrarMenu() {
        return "MENÚ TIENDA\n======\n 1. Mostrar Catálogo de Libros Disponibles\n 2. Insertar o Modificar Libro\n 3. Actualizar Stock de un Libro\n 4. Libros con Stock Mínimo";
    }

    iniciar() {
        this.cargarDatosPrueba();
        this.pedirOpcionMenu();
    }
}
