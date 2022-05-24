// const str = "osos";
// console.log(str);
// //const isPalindrome = (s) => s == s.
var cantidad = "6";
var cartas = 0;
var fib;
var fib1 = 0;
var fib2 = 1;
var proxFib;

if (cantidad >= 1) {

    carta = '';

    for (var x = 1; x <= cantidad; x++) {

        fib = fib1;
        proxFib = fib1 + fib2;
        fib1 = fib2;
        fib2 = proxFib;

        var carta = fib;

        cartas += carta;
        console.log(carta);
    }

}