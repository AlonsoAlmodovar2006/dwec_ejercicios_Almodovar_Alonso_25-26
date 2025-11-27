console.log("T04  Ejercicio 01");

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btn-comprar');
    boton.addEventListener('click', () => {
        main();
    });
});

//Lee sobre la diferencia entre DOMContentLoaded y windows.onload

function main() {
    try {
        // Lógica principal: crear libros, clientes, ventas, etc.
        const tienda = Tienda.getInstancia("Badulaque");
        // Invocar métodos que pueden lanzar errores.
    } catch (error) {
        console.log("Error en la ejecución:", error.message);
    }
}
