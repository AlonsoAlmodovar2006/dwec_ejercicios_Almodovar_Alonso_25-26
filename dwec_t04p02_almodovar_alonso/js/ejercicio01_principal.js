console.log("T04 - Ejercicio 01 - Principal");

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btn-comprar');
    boton.addEventListener('click', () => {
        main();
    });
});

function main() {
    try {
        // Lógica principal: crear libros, clientes, ventas, etc.
        const tienda = Tienda.getInstancia("Badulaque");
        tienda.iniciar();
        // Invocar métodos que pueden lanzar errores.
    } catch (error) {
        console.log("Error en la ejecución:", error);
    }
}
