console.log("T05 - Ejercicio 02");
document.addEventListener("DOMContentLoaded", () => {
    mostrarUOcultarNoticia();
});

function mostrarUOcultarNoticia() {
    const aLeer = document.getElementById("leer");
    const aQuitar = document.getElementById("quitar");
    const parrafo = document.getElementById("parrafo");

    aLeer.addEventListener("click", () => {
        parrafo.classList.remove("d-none");
        parrafo.classList.add("d-block");

        aQuitar.classList.remove("d-none");
        aQuitar.classList.add("d-block");

        aLeer.classList.remove("d-block");
        aLeer.classList.add("d-none");
    });

    aQuitar.addEventListener("click", () => {
        parrafo.classList.remove("d-block");
        parrafo.classList.add("d-none");

        aLeer.classList.remove("d-none");
        aLeer.classList.add("d-block");

        aQuitar.classList.remove("d-block");
        aQuitar.classList.add("d-none");
    });
}