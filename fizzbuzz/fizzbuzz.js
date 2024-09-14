/*
    Instalar jest $npm i -D jest
    Para correr "jest" ejecutamos el comando $npx jest --init
    Esto nos hara varias preguntas y creara el archivo jest.config.js

    Para no tener que estar ejecutando los test continuamente creamos el siguiente script en package.json
    "test:watch": "jest --watchAll"
    Para ejecutarla: $npm run test:watch

    Ejecutar la impresión: $node fizzbuzz

    Problema: Imprimir una lista de números de 0 a x, si el numero es multiplo de 3 imprime "fizz", si es
    multiplo de 5 imprime "buzz", si es multiplo de 3 y de 5 imprime "fizzbuzz" y en cualquier otro
    caso imprime el número.
*/

function fizzbuzz(num) {
    if (typeof num !== 'number') {
        return 'Error: el argumento debe ser un número';
    }
    const divisible = (divisor, num) => num % divisor === 0;
    if (num == 0) {
        return 0;
    }
    //if (num % 3 === 0 && num % 5 === 0) {
    if (divisible(3, num) && divisible(5, num)) {
        return 'fizzbuzz';
    }
    //if (num % 3 === 0) {
    if (divisible(3, num)) {
        return 'fizz';
    }
    //if (num % 5 === 0) {
    if (divisible(5, num)) {
        return 'buzz';
    }
    return num;
}

function print(num) {
    for(let i = 0; i <= num; i++) {
        console.log(`${i}: ${fizzbuzz(i)}`);
    }
}

print(16);

module.exports = fizzbuzz;