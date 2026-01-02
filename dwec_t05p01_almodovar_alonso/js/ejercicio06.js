console.log("T05 - Ejercicio 0X");
document.addEventListener("DOMContentLoaded", () => {
    cargarFunciones();
});

function cargarFunciones() {
    const parrafos = document.querySelectorAll('p');
    parrafos.forEach(parrafo => {
        parrafo.addEventListener('click', function (e) {
            const textoMayusculas = textoAMayusculas(parrafo.textContent);
            parrafo.textContent = textoMayusculas;
            insertarClaseTemporal(parrafo);
        });
        parrafo.addEventListener('dblclick', function (e) {
            const textoMinusculas = textoAMinusculas(parrafo.textContent);
            parrafo.textContent = textoMinusculas;
            insertarClaseTemporal(parrafo);
        });
    })
}

function textoAMayusculas(texto) {
    return texto.toUpperCase();
}

function textoAMinusculas(texto) {
    return texto.toLowerCase();
}

function insertarClaseTemporal(elemento) {
    elemento.classList.add('bg-warning');
    setTimeout(() => {
        elemento.classList.remove('bg-warning');
    }, 500);
}