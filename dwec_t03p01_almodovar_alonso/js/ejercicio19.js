console.log("T03 - Ejercicio 19");
/* Determina en un folio qué hace este script. Después comprueba que has acertado, haciendo uso de un depurador: */
let a = ["Sung", "Luffy", "Goku", "Sakura", "Asta", "Kenshin", "Meliodas"];
let b = new Date();
let c = a[b.getDay() % a.length];
let d = 0;
for (let i = 0; i < c.length; i++) {
    let e = Math.floor(Math.random() * c.length);
    let f = c.charAt(e);
    if (i % 2 === 0) {
        f = f.toUpperCase();
        c = c.slice(0, i) + f + c.slice(i + 1);
    }
    if ("aeiou".includes(f.toLowerCase())) {
        d += Math.pow(2, i);
    }
    console.log(f);
}
console.log(d.toFixed(0));
console.log(c);
console.log(e);
