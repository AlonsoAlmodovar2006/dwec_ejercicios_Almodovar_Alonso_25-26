console.log("T04 - Ejercicio 01");
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
            if (!this.existeAutorPorNombre(autor)) {
                contador++;
                this.listadoLibros.push(autor);
            }
        }
        return contador;
    }

    buscarAutoresPorNombre(nombreAbuscar) {
        const misAutores = this.listadoAutores.find((autor) => autor.nombre == nombreAbuscar);
        if (misAutores == undefined) {
            return null;
        } else {
            return misAutores;
        }
    }

    obtenerCadenaLibrosMenu() { 
        let mensaje = "TODOS LOS AUTORES REGISTRADOS EN LA TIENDA\n=====\n";
        let contador = 0;
        // Tendría que ordenar solo si no está ordenado
        this.listadoAutores.sort((a, b) => a.nombre.localeCompare(b.nombre));
        for (const autor of this.listadoAutores) {
            let nLibros = autor.libros.length;
            mensaje += ++contador + ". " + autor.nombre + `(${nLibros})\n`;
        }
        return mensaje;
    }

    // Aquellos otros métodos que consideres necesarios.
}
