export function generateNGolem(numero) {

    if (numero < 70) {
        return 1;
    }
    

    let rango = Math.floor((numero - 70) / 10) + 1;

    return rango;
}