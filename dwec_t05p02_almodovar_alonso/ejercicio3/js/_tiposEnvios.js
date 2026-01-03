console.log("T04 - Ejercicio 01 - Tipos Envíos");
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

    // No se pueden modificar los tipos.

    // No se pueden borrar tipos.

    obtenerCadenaTiposMenu() {
        let mensaje = "TODOS LOS TIPOS DE ENVÍO REGISTRADOS EN LA TIENDA\n=====\n";
        let contador = 0;
        this.listadoTiposEnvios.sort(function (a, b) { return b.precio - a.precio }); // Tendría que ordenar solo si no está ordenado
        for (const envio of this.listadoTiposEnvios) {
            mensaje += ++contador + ". " + envio.nombre + `(${envio.precio} €)\n`;
        }
        return mensaje;
    }

    // Aquellos otros métodos que consideres necesarios.
}

