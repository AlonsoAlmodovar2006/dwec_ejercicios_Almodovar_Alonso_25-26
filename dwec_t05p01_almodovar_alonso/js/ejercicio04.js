console.log("T05 - Ejercicio 04");
document.addEventListener("DOMContentLoaded", () => {
    cargarFunciones();
});

function cargarFunciones() {
    const inputText = document.getElementById('texto');
    const ul = document.getElementById('lista');
    const insertar = document.getElementById('btnInsertar');
    const borrar = document.getElementById('btnBorrar');
    const ordenar = document.getElementById('btnOrdenar');
    insertar.addEventListener("click", function () {
        if (inputText.value.trim() != "") {
            insertarAlimento(inputText.value, ul);
            inputText.value = "";
            inputText.focus();
        }

    });
    borrar.addEventListener("click", function () {
        const listaItems = ul.querySelectorAll('li');
        borrarAlimento(listaItems, inputText);
        inputText.value = "";
        inputText.focus();
    });
    ordenar.addEventListener("click", function () {
        const listaItems = ul.querySelectorAll('li');
        ordenarAlimentos(ul, listaItems);
    })
}

function insertarAlimento(texto, lista) {
    const nuevoAlimento = document.createElement("li");
    nuevoAlimento.textContent = texto;
    lista.appendChild(nuevoAlimento);
    nuevoAlimento.classList.add("list-group-item");
}

function borrarAlimento(lista, texto) {
    lista.forEach(item => {
        if (texto.value.trim() == item.textContent) {
            item.remove();
            return;
        }
    })

}

function ordenarAlimentos(lista, listaItems) {
    const arraylistaItems = Array.from(listaItems);
    arraylistaItems.sort((a,b) => a.textContent.localeCompare(b.textContent));
    lista.innerHTML = "";
    for (let i = 0; i < arraylistaItems.length; i++) {
        insertarAlimento(arraylistaItems[i].textContent, lista);
    }
}