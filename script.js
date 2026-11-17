
/* =====================================
   1. REFERENCIAS A ELEMENTOS HTML
===================================== */

// Selector del número de dados
const cantidad = document.getElementById("cantidad");

// Selector del tipo de dado (número de caras)
const tipo = document.getElementById("tipo");

// Contenedor donde aparecerán los dados
const dados = document.getElementById("dados");

// Elemento que muestra la suma total
const total = document.getElementById("total");

// Lista donde se guardará el historial
const lista = document.getElementById("lista");

// Botón para lanzar los dados
const lanzar = document.getElementById("lanzar");


/* =====================================
   2. VARIABLES
===================================== */

// Array que almacena las últimas tiradas
const historial = [];

// Número máximo de tiradas que guardaremos
const MAX_HISTORIAL = 10;


/* =====================================
   3. GENERACIÓN DE NÚMEROS ALEATORIOS
===================================== */

/**
 * Genera un número aleatorio entre 1 y el
 * número máximo indicado, ambos inclusive.
 *
 * @param {number} maximo - Número de caras del dado.
 * @returns {number} Resultado aleatorio.
 */
function numeroAleatorio(maximo) {

    const limite = Math.floor(4294967296 / maximo) * maximo;

    const buffer = new Uint32Array(1);

    do {
        crypto.getRandomValues(buffer);

    } while (buffer[0] >= limite);

    return (buffer[0] % maximo) + 1;
}


/* =====================================
   4. CREACIÓN VISUAL DE LOS DADOS
===================================== */

/**
 * Crea y muestra visualmente un dado.
 *
 * @param {number} resultado - Resultado obtenido.
 * @param {number} numero - Posición del dado.
 * @param {number} caras - Número de caras del dado.
 */
function mostrarDado(resultado, numero, caras) {

    const dado = document.createElement("div");

    dado.className = "dado";

    dado.textContent = resultado;

    dado.setAttribute(
        "aria-label",
        `Dado ${numero}, de ${caras} caras: ${resultado}`
    );

    dados.appendChild(dado);
}


/* =====================================
   5. FUNCIÓN PRINCIPAL: TIRAR DADOS
===================================== */

function tirarDados() {

    // Obtenemos la cantidad seleccionada
    const numeroDados = Number(cantidad.value);

    // Obtenemos el número de caras seleccionado
    const numeroCaras = Number(tipo.value);

    // Array para guardar los resultados actuales
    const resultados = [];

    // Limpiamos los dados anteriores
    dados.replaceChildren();


    // Generamos cada dado
    for (let i = 0; i < numeroDados; i++) {

        // Generamos un resultado según las caras seleccionadas
        const resultado = numeroAleatorio(numeroCaras);

        // Guardamos el resultado
        resultados.push(resultado);

        // Mostramos visualmente el dado
        mostrarDado(resultado, i + 1, numeroCaras);
    }


    /* =====================================
       6. CÁLCULO DEL RESULTADO TOTAL
    ===================================== */

    const suma = resultados.reduce((a, b) => a + b, 0);

    total.textContent = `Total: ${suma}`;


    /* =====================================
       7. ACTUALIZACIÓN DEL HISTORIAL
    ===================================== */

    historial.unshift(
        `${numeroDados}d${numeroCaras}: ${resultados.join(" + ")} = ${suma}`
    );

    // Conservamos solamente las últimas 10 tiradas
    historial.splice(MAX_HISTORIAL);


    // Limpiamos el historial visual
    lista.replaceChildren();


    // Mostramos las tiradas guardadas
    historial.forEach((tirada) => {

        const elemento = document.createElement("li");

        elemento.textContent = tirada;

        lista.appendChild(elemento);
    });
}


/* =====================================
   8. EVENTOS
===================================== */

// Ejecutamos tirarDados cuando se pulsa el botón
lanzar.addEventListener("click", tirarDados);
