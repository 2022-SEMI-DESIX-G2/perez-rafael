// Escribir una función que, dado un año "a", retorne si ese año es bisiesto o no.
const principal3 = (() => {
    function bisiesto(x) {
        return (x % 400 === 0) ? true :
            (x % 100 === 0) ? false :
            x % 4 === 0;
    };

    function validar(y) {
        let bool = bisiesto(y);
        if (bool) {
            return 'Es año bisiesto';
        } else {
            return 'No es año bisiesto';
        }
    }
    console.log("el año 2020 " + validar(2020))

})()