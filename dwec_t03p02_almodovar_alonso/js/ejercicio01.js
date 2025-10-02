console.log("T03 - Ejercicio 01");
function oraculo(...nVariables) {
    // 0
    if (nVariables == null || nVariables == 0) {
        nVariables = 0;
        console.log(`No he recibido ningún argumento. El valor es ${nVariables}`);
    } else {
        for (let i = 0; i < nVariables.length; i++) {
            console.log(`El número ${i + 1} es: ${arguments[i]}`);
        }

        // 1
        let arrayNumeros = verificarNumero(nVariables);

        // 2
        let media = function () {
            let suma = 0;
            for (let i = 0; i < arrayNumeros.length; i++) {
                suma += arrayNumeros[i];
            }
            return suma / arrayNumeros.length;
        };
        let calculoMedia = media()
        console.log(calculoMedia)
        // Es mejor añadir las funciones en una variable

        // 3
        let maximo = () => Math.max(...arrayNumeros);
        console.log(maximo());

        // 4
        let minimo = () => Math.min(...arrayNumeros);
        console.log(minimo());

        // 5
        desviacion(calculoMedia, arrayNumeros);

        // 6
        let mensaje = (media, desviacion, minimo, maximo, arrayNumeros) => {
            if (media < 30){
                return "Tu destino es entrenar más duro. Tus estadísticas están por debajo del mínimo requerido";
            } else if (media > 30 && media < 60){
                return `Estás en el camino del héroe. El valor máximo alcanzado fue ${maximo} y el mínimo ${minimo}`;
            } else {
                return `Eres un maestro legendario. Tus desviaciones son: ${desviacion(media, arrayNumeros)}`;
            }
        }
        console.log(mensaje(calculoMedia,desviacion(media(),arrayNumeros),minimo(),maximo(),arrayNumeros));
    }
}

function verificarNumero(nVariables) {
    let arrayNumeros = [];
    for (let i = 0; i < nVariables.length; i++) {
        nVariables[i] = Number(nVariables[i]);
        if (isNaN(nVariables[i])) {
            console.log(`ERROR. El parámetro ${i + 1} que me has pasado no es un Número. Ahora vale undefined`)
            nVariables[i] = undefined;
        } else{
            arrayNumeros.push(nVariables[i])
        }
    }
    return arrayNumeros;
}

function desviacion(media, arrayNumeros){
    let desviacionMedia = [];
    for (let i = 0; i < arrayNumeros.length; i++) {
        desviacionMedia.push(arrayNumeros[i] - media);
        console.log(`La desviación de la media del parámetro ${i + 1} es: ${desviacionMedia[i]}`);
    }
    return desviacionMedia;
}

(function () {
    oraculo();
    console.log("---")
    oraculo(10, "20", "Juan", 40);
    console.log("---");
    debugger;
    oraculo(1,2,3,4);
})();

