console.log("T03 - Ejercicio 13");
/* ¿Cómo se resolvería el ejercicio anterior definiendo un nuevo método en el objeto Math que se llame "random2(lim_inf, lim_sup)"? */
let cupon = "";

Math.random2 = function (lim_inf,lim_sup){
    return Math.floor(Math.random() * (lim_sup-lim_inf + 1)) + lim_inf;
}

for (let i = 0; i <5 ;i++){
    cupon+= Math.random2(0,9).toString();
}

console.log(cupon);