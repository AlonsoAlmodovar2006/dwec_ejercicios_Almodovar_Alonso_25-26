console.log("T04 - Ejercicio 01");
class TiposEnvios {
    #listadoTiposEnvios;

    constructor() {
        this.#listadoTiposEnvios = [];
    }

    get listadoTiposEnvios() {
        return this.#listadoTiposEnvios;
    }

    existeTipoPorNombre(nombreAbuscar) {
        const hayTipo = this.listadoTiposEnvios.some((tipo) => tipo.nombre == nombreAbuscar);
        return hayTipo;
    }

    insertarTipos(tiposEnvios) {
        let contador = 0;
        for (const tipos of tiposEnvios) {
            if (!this.existeTipoPorNombre(tipos)) {
                contador++;
                this.listadoTiposEnvios.push(tipos);
            }
        }
        return contador;
    }

    buscarTiposPorNombre(nombreAbuscar) {
        const misTipos = this.listadoTiposEnvios.find((tipos) => tipos.nombre == nombreAbuscar);
        if (misTipos == undefined) {
            return null;
        } else {
            return misTipos;
        }
    }

    // No se pueden modificar ni borrar los tipos

    obtenerCadenaLibrosMenu() {
        let mensaje = "TODOS LOS TIPOS DE ENVÍO REGISTRADOS EN LA TIENDA\n=====\n";
        let contador = 0;
        // Tendría que ordenar solo si no está ordenado
        this.listadoTiposEnvios.sort(function (a, b) { return b.precio - a.precio });
        for (const tipos of this.listadoTiposEnvios) {
            mensaje += ++contador + ". " + tipos.nombre + `(${tipos.precio} €)\n`;
        }
        return mensaje;
    }

    // Aquellos otros métodos que consideres necesarios.
}

