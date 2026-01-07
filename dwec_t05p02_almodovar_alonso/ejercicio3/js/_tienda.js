console.log("T05 - Ejercicio 03 - Tienda");
class Tienda {
    #libros; // Objeto Libros
    #autores; // Objeto Autores
    #tiposEnvios; // Objeto Tipos de Envío
    #clientes; // Objeto Clientes
    #pedidos; // Objeto Pedidos
    #nombre; // Nombre de la tienda
    #lector; // Objeto leerDatosPrompt

    static instancia = null;
    static IVA = 0.21;

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
        this.lector = new LeerDatosForm();
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
        if (!(valor instanceof LeerDatosForm)) {
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
        new TipoEnvio("Gran Volumen", 5, 20000, 19.99),
        new TipoEnvio("Sin Envío", 1, 0, 2.99)];
        this.tiposEnvios.insertarTipos(envios);

        const clientes = [new Cliente("12345678", "Alonso Almodóvar", "Calle Mayor 1, Valdepeñas"),
        new Cliente("87654321", "Carlos Pérez", "Av. Diagonal 20, Barcelona")];
        this.clientes.insertarClientes(clientes);

        const pedidos = [new Pedido(clientes[0]), new Pedido(clientes[1]), new Pedido(clientes[1])];
        this.pedidos.insertarPedidos(pedidos);

        clientes[0].insertarPedidoCliente(pedidos[0]);
        clientes[1].insertarPedidoCliente(pedidos[1]);
        clientes[1].insertarPedidoCliente(pedidos[2]);

        pedidos[0].insertarLibro(libros[2], 1);
        pedidos[0].calcularTotal();

        pedidos[1].insertarLibro(libros[1], 1);
        libros[1].reducirStock();
        pedidos[1].establecerTipoEnvio(envios[2]);
        pedidos[1].calcularTotal();

        pedidos[2].insertarLibro(libros[2], 1);
        pedidos[2].calcularTotal();
    }

    iniciar() {
        this.cargarDatosPrueba();
        // this.pedirOpcionMenu();
    }

    // mostrarMenu()

    // pedirOpcionMenu() 

    pedirYCrearLibro(isbn, titulo, generoLiterario, autores, precio, tipo, tamanoArchivo, formato, peso, dimensiones, stock) {
        let nuevoLibro = null;
        let losAutores = [];
        if (this.autores.buscarAutoresPorNombre(autores[0]) === null) {
            const primerAutor = this.pedirYCrearAutor(autores[0]);
            losAutores.push(primerAutor);
        } else {
            losAutores.push(this.autores.buscarAutoresPorNombre(autores));
        }
        if (tipo == "Ebook") {
            nuevoLibro = new Ebook(isbn, titulo, generoLiterario, autores, precio, tamanoArchivo, formato);
        } else if (tipo == "Papel") {
            nuevoLibro = new LibroPapel(isbn, titulo, generoLiterario, autores, precio, peso, dimensiones, stock);
        } else {
            throw new Error("Instancia Tipo mal creada")
        }
        const nLibrosCreados = this.libros.insertarLibros([nuevoLibro]);
        if (nLibrosCreados == 0) nuevoLibro = null;
        return nuevoLibro;
    }

    // pedirYCrearVariosLibros

    pedirYCrearAutor(nombre) {
        return new Autor(nombre);
    }

    // pedirYCrearVariosAutores

    pedirYCrearCliente(dni, nombre, direccion) {
        let nuevoCliente = null;
        let clientesInsertados = this.clientes.insertarClientes([new Cliente(dni, nombre, direccion)]);
        if (clientesInsertados > 0) {
            nuevoCliente = new Cliente(dni, nombre, direccion);
        }
        return nuevoCliente
    }

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

    // mostrarPedidosAbiertoCliente

    // borrarCliente

    // hacerPedidoPorCliente

    // mostrarPedidoPorID

    // Aquellos que consideres necesarios. 
    mostrarClientes() {
        return this.clientes.obtenerClientes();
    }

    mostrarAutores() {
        return this.autores.obtenerAutores();
    }

    mostrarGeneros() {
        return Libro.listaGeneros();
    }

    mostrarFormatos() {
        return Ebook.listaFormatos();
    }
}


/* La tienda nos permite estas gestiones:

Mostrar Catálogo de Libros Disponibles.
Muestra al usuario todos los libros disponibles en la tienda (tanto con stock como sin stock).

Insertar Libros o modificar los datos de un libro existente. Se buscará el libro por ISBN. Si no existe, se crea, si existe se modifica. 

Actualizar stock libros. Pide los datos necesarios y actualiza el stock de los libros indicados por el usuario.

Ver notificaciones stock libros bajo mínimo. Muestra un listado de los libros en papel que están sin stock o por debajo del mínimo establecido.

Insertar nuevo cliente. 

Mostrar pedidos abiertos de un cliente por DNI.

Borrar cliente cliente por DNI.

Hacer pedido por cliente identificado por DNI. 
Se busca el cliente. Debe estar creado previamente.
Se debe permitir la compra usando un buscador o mostrando un listado de libros (tanto con stock como sin stock).
Se debe poder seleccionar el método de envío.
Al finalizar mostrará el total del pedido y un resumen completo del mismo. También preguntará si hay que aplicar algún descuento.

Mostrar pedido por ID de pedido.

Mostrar estadísticas:
Libro más vendido (reduce y/o find).
Autor que más dinero ha ganado (reduce).
Cliente que más pedidos has realizado (solo mirando pedidos) (reduce y/o find).
Cliente que más libros ha comprado (mirando unidades) (reduce).
Número total de pedidos abiertos (filter). 
Importe total facturado (sumando todos los pedidos cerrados) (filter y reduce).
Tipo de envío más utilizado (reduce).

Salir.
 */