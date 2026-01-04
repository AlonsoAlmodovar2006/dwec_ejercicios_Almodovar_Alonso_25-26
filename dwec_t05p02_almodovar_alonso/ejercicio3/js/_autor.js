console.log("T05 - Ejercicio 03 - Autor");

class Autor {
    #id; // único e Incrementado Internamente
    #nombre; // Nombre Completo
    #libros; // Array de Objetos Libro

    static ultimoId = 0;

    static obtenerSiguienteId() {
        this.ultimoId++;
        return this.ultimoId;
    }

    constructor(nombreApellidos) {
        this.#id = Autor.obtenerSiguienteId();
        this.nombre = nombreApellidos;
        this.#libros = [];
    }

    get id() {
        return this.#id;
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

    get libros() {
        return this.#libros;
    }

    mostrarDatosAutor() {
        let tituloLibros = "";
        for (const elLibro of this.libros) {
            tituloLibros += elLibro.titulo + " - ";
        }
        return `(Autor) ${this.id} - Nombre: ${this.nombre} | Libros: ${tituloLibros} `;
    }

    insertarLibro(libro) {
        if (this.libros.some(misLibros => misLibros.isbn == libro.isbn)) {
            this.libros.push(libro);
        }
        return this.libros.length;
    }

    tieneLibros() {
        return this.libros.length > 0;
    }

    // Aquellos métodos que necesite
}