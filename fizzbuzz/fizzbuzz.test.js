const fizzbuzz = require('./fizzbuzz');

describe('fizzbuzz', () => {
    test('deberia pintar un mensaje de error si se recibe un argumento no numérico', () => {
        const expected = 'Error: el argumento debe ser un número';
        const result = fizzbuzz('16');
        expect(expected).toBe(result);
    });

    test('deberia pintar 1 si se recibe 1', () => {
        const expected = 1;
        const result = fizzbuzz(1);
        expect(expected).toBe(result);
    });

    test('deberia pintar fizz si se recibe un 3', () => {
        const expected = 'fizz';
        const result = fizzbuzz(3);
        expect(expected).toBe(result);
    });

    test('deberia pintar fizz si se recibe un multiplo de 3', () => {
        const expected = 'fizz';
        const result = fizzbuzz(6);
        expect(expected).toBe(result);
    });

    test('deberia pintar buzz si se recibe un 5', () => {
        const expected = 'buzz';
        const result = fizzbuzz(5);
        expect(expected).toBe(result);
    });

    test('deberia pintar buzz si se recibe un multiplo de 5', () => {
        const expected = 'buzz';
        const result = fizzbuzz(10);
        expect(expected).toBe(result);
    });

    test('deberia pintar fizzbuzz si se recibe un multiplo de 3 y de 5', () => {
        const expected = 'fizzbuzz';
        const result = fizzbuzz(15);
        expect(expected).toBe(result);
    });
});