console.log("T04 - Ejercicio 01");
class Autor {
    #id; // único e incrementado internamente
    #nombre; // Nombre y Apellidos
    #libros; // Array de objetos con sus libros

    static ultimoId = 0;

    static obtenerSiguienteId() {
        this.ultimoId++;
        return this.ultimoId;
    }

    constructor(nombreApellidos) {
        this.#id = this.obtenerSiguienteId();
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
        return `Autor (${this.id}): ${this.nombre}, ${this.libros} `;
    }

    insertarLibro(libro) {
        if (Libros.existeLibroPorIsbn(libro.isbn) && !this.libros.some(misLibros => misLibros.isbn == libro.isbn)) {
            this.libros.push(libro);
        }
        return this.libros.length;
    }

    tieneLibros() {
        return this.libros.length > 0;
    }

    // Aquellos métodos que necesite
}