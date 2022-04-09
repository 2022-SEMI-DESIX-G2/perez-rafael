// Escribir una función que, dada una cadena "t", retorne la cantidad de caracteres de la cadena.
// Ejemplo: Dado AABBBACAA
// Se debería retornar que hay 5 A, 3 B, 1 C. El tipo de dato del retorno es a discreción del estudiante
class Problem2 {

    constructor() {

        console.log(this.CCaracteres());

    }
    CCaracteres() {
        let texto = prompt('Escriba una serie de caracteres');
        return [...texto.replace(/\s/g, '')].reduce((objeto, caracter) => {
            objeto[caracter] = objeto[caracter] + 1 || 1;
            console.log(`La cadena ${texto} se divede de la siguente manera`)
            return objeto;
        }, {});
    }

}
var problem2 = new Problem2();