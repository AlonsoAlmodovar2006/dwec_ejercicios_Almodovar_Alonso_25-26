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
            if (!this.existeLibroPorIsbn(libro)) {
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

    obtenerCadenaLibrosMenu() { 
        let mensaje = "TODOS LOS LIBROS DE LA TIENDA\n=====\n";
        let contador = 0;
        let tipoLibro = "??";
        // Tendría que ordenar solo si no está ordenado
        this.listadoLibros.sort((a, b) => a.titulo.localeCompare(b.titulo));
        for (const libro of this.listadoLibros) {
            if (libro instanceof Ebook) {
                tipoLibro = "Ebook";
            } else if (libro instanceof LibroPapel) {
                tipoLibro = "Libro de Papel";
            }
            mensaje += ++contador + ". " + libro.titulo + `(${tipoLibro})\n`;
        }
        return mensaje;
    }

    // Aquellos otros métodos que considere necesarios
}
