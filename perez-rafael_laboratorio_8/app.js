const express = require('express')
const app = express()

app.get('/fibonacci/:numero', function(req, res) {
    const { numero } = req.params;
    var cantidad = numero;
    var cartas = 0;
    var fib;
    var fib1 = 0;
    var fib2 = 1;
    var proxFib;

    if (cantidad >= 1) {
        cartas = [];
        for (var x = 1; x <= cantidad; x++) {
            fib = fib1;
            proxFib = fib1 + fib2;
            fib1 = fib2;
            fib2 = proxFib;
            var carta = fib;
            cartas.push(carta);
        }

        res.json(`sequence: [${cartas}]`);
    }
})

app.listen(3000)