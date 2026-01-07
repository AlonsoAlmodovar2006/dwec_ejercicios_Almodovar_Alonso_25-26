console.log("T05 - Ejercicio 03 - Libros");

class Libros {
    #listadoLibros;

    constructor() {
        this.#listadoLibros = [];
    }

    get listadoLibros() {
        return this.#listadoLibros;
    }

    existeLibroPorIsbn(isbnAbuscar) {
        const hayLibro = this.listadoLibros.some((libro) => libro.isbn == isbnAbuscar);
        return hayLibro;
    }

    insertarLibros(libros) {
        let contador = 0;
        for (const libro of libros) {
            if (!this.existeLibroPorIsbn(libro.isbn)) {
                contador++;
                this.listadoLibros.push(libro);
            }
        }
        return contador;
    }

    buscarLibroPorIsbn(isbnAbuscar) {
        const miLibro = this.listadoLibros.find((libro) => libro.isbn == isbnAbuscar);
        if (miLibro == undefined) {
            return null;
        } else {
            return miLibro;
        }
    }

    buscarLibroPorTitulo(tituloAbuscar) {
        const misLibros = this.listadoLibros.filter((libro) => libro.titulo == tituloAbuscar);
        return misLibros;
    }

    modificarLibroPorIsbn(isbnAmodificar, mapaConInfo) {
        let hayModificacion = false;
        const miLibro = this.buscarLibroPorIsbn(isbnAmodificar);
        if (miLibro != null) {
            try {
                miLibro.modificarLibro(mapaConInfo);
            } catch (error) {
                console.error("Entrada inválida: " + error.message);
            }
            hayModificacion = true;
        }
        return hayModificacion;
    }

    // No se pueden borrar Libros

    obtenerCadenaLibrosMenu() { // Cambiado con la nueva forma de acceder a los libros
        let libros = [];
        this.listadoLibros.sort((a, b) => a.titulo.localeCompare(b.titulo)); // Tendría que ordenar solo si no está ordenado
        for (const libro of this.listadoLibros) {
            libros.push(libro);
        }
        return libros;
    }

    // Aquellos otros métodos que consideres necesarios
    tamanoListaLibros() {
        return this.listadoLibros.length;
    }
}
