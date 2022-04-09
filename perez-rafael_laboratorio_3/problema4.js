// Escribir una función que, dado un número "n" ( 0 < n < 1000000), retorne la sumatoria de todos los número primos debajo de ese número.
// Ejemplo: Dado 7
// Se debería retornar 18, ya que: 1 + 2 + 3 + 5 + 7 = 1
class Problem4 {
    constructor() {
        this.sumdeprimos()
    }

    sumdeprimos() {
        const n = prompt('4. Intoduzca valor para saber su sumatoria: ');
        let primo = new Array(n + 1);

        for (let i = 0; i < n + 1; i++)
            primo[i] = true;
        for (let p = 2; p * p <= n; p++) {
            if (primo[p] == true) {
                for (let i = p * 2; i <= n; i += p)
                    primo[i] = false;
            }
        }
        let sum = 0;
        for (let i = 2; i <= n; i++)
            if (primo[i])
                sum += i;
        return console.log(`La suma de los numeros primos del 1 al ${n} es ${sum} `);;
    }
}
const problem4 = new Problem4();