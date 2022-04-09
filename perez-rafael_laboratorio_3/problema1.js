// Escribir una función que, dada una cadena "t", retorne si un número es un palíndromo de doble base o no. (Palíndromo en base 10 y base 2)
const principal = (() => {

    function palindromo(val) {
        const inverso = val.split("").reverse().join("");
        let b = binario(val);
        const inverso2 = b.split("").reverse().join("");
        if (inverso === val && b === inverso2) {
            return 'Es palindromo de doble base';
        } else {
            return 'No es palindromo de doble base';
        }
    }

    function binario(n) {
        return (n).toString(2);
    }
    console.log(palindromo('3'));

})()