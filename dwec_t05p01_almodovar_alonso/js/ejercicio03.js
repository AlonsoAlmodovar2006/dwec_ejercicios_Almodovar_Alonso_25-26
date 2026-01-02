console.log("T05 - Ejercicio 03");
document.addEventListener("DOMContentLoaded", () => {
    eventosDeRatonEnImg();
});

function eventosDeRatonEnImg() {
    const img = document.querySelector("img");
    const pEvento = document.getElementById("evento");
    const miBoton = document.querySelector("button");
    let activo = true;
    const mouseMoveHandler = function (e) {
        pEvento.textContent = `[EVENTO MOUSEMOVE] Moviendote por la foto en las coordenadas: (${e.clientX}, ${e.clientY})`;
    };
    img.addEventListener("mousemove", mouseMoveHandler);
    miBoton.addEventListener("click", function () {
        activo = activarODesactivarMousemove(miBoton);
        if (activo) {
            img.addEventListener("mousemove", mouseMoveHandler);
        } else {
            img.removeEventListener("mousemove", mouseMoveHandler);
        }
    });
    tipoEvento(img, pEvento, "click", "[EVENTO CLICK] Click en la foto");
    tipoEvento(img, pEvento, "dblclick", "[EVENTO DBLCLICK] Doble Click en la foto");
    tipoEvento(img, pEvento, "mousedown", "[EVENTO MOUSEDOWN] Manteniendo el click en la foto");
    tipoEvento(img, pEvento, "mouseover", "[EVENTO MOUSEOVER] Ratón encima de la foto");
    tipoEvento(img, pEvento, "mouseout", "[EVENTO MOUSEOUT] Ratón fuera de la foto");
    tipoEvento(img, pEvento, "mouseup", "[EVENTO MOUSEUP] Anticlick en la foto");
}

function tipoEvento(img, pEvento, evento, mensaje) {
    img.addEventListener(evento, () => {
        pEvento.textContent = mensaje;
    })
}

function activarODesactivarMousemove(miBoton) {
    let text = miBoton.textContent;
    if (text == "Desactivar Mousemove") {
        miBoton.textContent = "Activar Mousemove";
        return false;
    } else {
        miBoton.textContent = "Desactivar Mousemove";
        return true;
    }
}
