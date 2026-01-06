console.log("T05 - Ejercicio 03 - Autores");

class Autores {
    #listadoAutores;

    constructor() {
        this.#listadoAutores = [];
    }

    get listadoAutores() {
        return this.#listadoAutores;
    }

    existeAutorPorNombre(nombreAbuscar) {
        const hayAutor = this.listadoAutores.some((autor) => autor.nombre == nombreAbuscar);
        return hayAutor;
    }

    insertarAutores(autores) {
        let contador = 0;
        for (const autor of autores) {
            if (!this.existeAutorPorNombre(autor.nombre)) {
                contador++;
                this.listadoAutores.push(autor);
            }
        }
        return contador;
    }

    buscarAutoresPorID(idAbuscar) {
        const misAutores = this.listadoAutores.find((autor) => autor.id == idAbuscar);
        if (misAutores == undefined) {
            return null;
        } else {
            return misAutores;
        }
    }

    buscarAutoresPorNombre(nombreAbuscar) {
        const misAutores = this.listadoAutores.find((autor) => autor.nombre == nombreAbuscar);
        if (misAutores == undefined) {
            return null;
        } else {
            return misAutores;
        }
    }

    // No se pueden modificar los autores

    // No se pueden borrar autores

    obtenerCadenaAutoresMenu() { // La primera parte del mensaje debería ir en Tienda
        let mensaje = "TODOS LOS LIBROS DE LOS AUTORES REGISTRADOS EN LA TIENDA\n=====\n";
        let contador = 0;
        this.listadoAutores.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Tendría que ordenar solo si no está ordenado
        for (const autor of this.listadoAutores) {
            let nLibros = autor.libros.length;
            mensaje += ++contador + ". " + autor.nombre + `(${nLibros})\n`;
        }
        return mensaje;
    }

    // Aquellos otros métodos que consideres necesarios.
    obtenerAutores() { // La primera parte del mensaje debería ir en Tienda
        let mensaje = "TODOS LOS AUTORES REGISTRADOS EN LA TIENDA\n=====\n";
        for (const autor of this.listadoAutores) {
            mensaje += autor.mostrarDatosAutor() + "\n";
        }
        return mensaje;
    }

    tamanoListaAutores() {
        return this.listadoAutores.length;
    }
}
