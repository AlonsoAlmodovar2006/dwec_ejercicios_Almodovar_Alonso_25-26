console.log("T05 - Ejercicio 0X");
document.addEventListener("DOMContentLoaded", () => {
    cargarFunciones();
});

function cargarFunciones() {
    const inputText = document.getElementById("texto");
    const ul = document.getElementById("lista");
    inputText.addEventListener("keydown", function (e) {
        crearElementoLista(ul, `[KEYDOWN] 1. ${e.key}, 2. ${e.code}, 3. ${e.keyCode} AltKey:. ${e.altKey} CtrlKey:. ${e.ctrlKey} ShiftKey:. ${e.shiftKey}`);
    });

    inputText.addEventListener("keyup", function (e) {
        crearElementoLista(ul, `[KEYUP] 1. ${e.key}, 2. ${e.code}, 3. ${e.keyCode} AltKey:. ${e.altKey} CtrlKey:. ${e.ctrlKey} ShiftKey:. ${e.shiftKey}`);
    });
}

function crearElementoLista(lista, mensaje) {
    const nuevoText = document.createElement("li");
    nuevoText.textContent = mensaje;
    lista.prepend(nuevoText);
    nuevoText.classList.add("list-group-item");
    const listItems = lista.children;
    for (let i = 0; i < listItems.length; i++) {
        if (i >= 20) {
            listItems[i].style.display = 'none';
        }
    }
}