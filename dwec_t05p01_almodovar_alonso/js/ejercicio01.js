console.log("T05 - Ejercicio 01");
document.addEventListener("DOMContentLoaded", () => {
    cambiarColorBotones();
});

function cambiarColorBotones() {
    const btnRojo = document.getElementById("rojo");
    const btnAzul = document.getElementById("azul");
    const btnVerde = document.getElementById("verde");
    const main = document.querySelector("main");

    btnRojo.addEventListener("click", () => {
        main.classList.add("bg-danger");
        main.classList.remove("bg-success");
        main.classList.remove("bg-primary");
    });

    btnAzul.addEventListener("click", () => {
        main.classList.remove("bg-danger");
        main.classList.remove("bg-success");
        main.classList.add("bg-primary");
    });

    btnVerde.addEventListener("click", () => {
        main.classList.remove("bg-danger");
        main.classList.remove("bg-primary");
        main.classList.add("bg-success");
    });
}