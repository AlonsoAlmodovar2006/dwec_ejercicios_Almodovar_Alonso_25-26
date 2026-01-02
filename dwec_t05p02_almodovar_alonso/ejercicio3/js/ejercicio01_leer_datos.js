class LeerDatos {
    leerEntero(mensaje_o_id) {
        throw new Error("Método no implementado");
    }

    leerEnteroHasta(mensaje_o_id) {
        throw new Error("Método no implementado");
    }

    leerReal(mensaje_o_id) {
        throw new Error("Método no implementado");
    }

    leerEnteroEntre(mensaje_o_id, min, max) {
        throw new Error("Método no implementado");
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        throw new Error("Método no implementado");
    }

    leerCadena(mensaje_o_id, longitud, patron) {
        throw new Error("Método no implementado");
    }

    leerCadenaHasta(mensaje_o_id, longitud, patron) {
        throw new Error("Método no implementado");
    }
}

class LeerDatosPrompt extends LeerDatos {
    leerEntero(mensaje_o_id) {
        const entrada = prompt(mensaje_o_id);

        if (!Util.validarEntero(entrada)) {
            throw new Error("El valor introducido no es un número entero");
        }

        return Number(entrada);
    }

    leerEnteroHasta(mensaje_o_id) {
        let numero = -1;
        let esValido = false;

        while (!esValido) {
            try {
                numero = this.leerEntero(mensaje_o_id);
                esValido = true;
            } catch (error) {
                console.error("Entrada inválida: " + error.message);
            }
        }

        return numero;
    }

    leerReal(mensaje_o_id) {
        const entrada = prompt(mensaje_o_id);

        if (!Util.validarReal(entrada)) {
            throw new Error("El valor introducido no es un número real");
        }

        return entrada;
    }

    leerRealHasta(mensaje_o_id) {
        let numero = -1;
        let esValido = false;

        while (!esValido) {
            try {
                numero = this.leerReal(mensaje_o_id);
                esValido = true;
            } catch (error) {
                console.error("Entrada inválida: " + error.message);
            }
        }

        return numero;
    }


    leerEnteroEntre(mensaje_o_id, min, max) {
        const entrada = prompt(mensaje_o_id);

        if (!Util.validarEntero(entrada) || entrada < min || entrada > max) {
            throw new Error("El valor no está entre el intervalo establecido");
        }

        return entrada;
    }

    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let numero;
        let esValido = false;

        while (!esValido) {
            try {
                numero = this.leerEnteroEntre(mensaje_o_id, min, max);
                esValido = true;
            } catch (error) {
                console.error("Entrada inválida: " + error.message);
            }
        }

        return numero;
    }

    leerCadena(mensaje_o_id, longitud, patron) {
        switch (arguments.length) {
            case 1:
                const entrada1 = prompt(mensaje_o_id);
                if (!Util.validarEntrada(entrada1)) {
                    throw new Error("No has introducido ningún valor");
                }
                return entrada1;
            case 2:
                const entrada2 = prompt(mensaje_o_id);
                if (!Util.validarEntrada(entrada2, longitud)) /* entrada2.trim() === "" */ {
                    throw new Error("La cadena que has introducido no entra dentro de la longitud");
                }
                return entrada2;
            case 3:
                const entrada3 = prompt(mensaje_o_id);
                if (!Util.validarEntrada(entrada3, longitud)) {
                    throw new Error("La cadena que has introducido no entra dentro de la longitud");
                }
                if (!patron.test(mensaje_o_id)) {
                    throw new Error("La cadena que has introducido no pasa el patrón");
                }
                return entrada3;
            default:
                throw new Error("No debería haber pasado esto");
        }
    }

    leerCadenaHasta(mensaje_o_id, longitud, patron) {
        let esValido = false;
        let entrada = "";

        while (!esValido) {
            try {
                switch (arguments.length) {
                    case 1:
                        entrada = this.leerCadena(mensaje_o_id);
                        esValido = true;
                        break;
                    case 2:
                        entrada = this.leerCadena(mensaje_o_id, longitud);
                        esValido = true;
                        break;
                    case 3:
                        entrada = this.leerCadena(mensaje_o_id, longitud, patron);
                        esValido = true;
                        break;
                    default:
                        throw new Error("No debería haber pasado esto");
                }
            } catch (error) {
                console.error("Entrada inválida: " + error.message);
            }
        }
        return entrada;
    }
}