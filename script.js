
/* =====================================
   1. REFERENCIAS A ELEMENTOS HTML
===================================== */

// Selector del número de dados
const cantidad = document.getElementById("cantidad");

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


/* =====================================
   3. GENERACIÓN DE NÚMEROS ALEATORIOS
===================================== */

function numeroAleatorio(maximo) {

    const limite = Math.floor(4294967296 / maximo) * maximo;

    const buffer = new Uint32Array(1);

    do {
        crypto.getRandomValues(buffer);

    } while (buffer[0] >= limite);

    return (buffer[0] % maximo) + 1;
}


/* =====================================
   4. FUNCIÓN PRINCIPAL: TIRAR DADOS
===================================== */

function tirarDados() {

    // Obtenemos la cantidad seleccionada
    const numeroDados = Number(cantidad.value);

    // Array para guardar los resultados actuales
    const resultados = [];

    // Limpiamos los dados anteriores
    dados.replaceChildren();


    // Generamos cada dado
    for (let i = 0; i < numeroDados; i++) {

        const resultado = numeroAleatorio(6);

        resultados.push(resultado);

        // Creamos el elemento visual del dado
        const dado = document.createElement("div");

        dado.className = "dado";

        dado.textContent = resultado;

        dado.setAttribute(
            "aria-label",
            `Dado ${i + 1}: ${resultado}`
        );

        // Añadimos el dado a la página
        dados.appendChild(dado);
    }


    /* =====================================
       5. CÁLCULO DEL RESULTADO TOTAL
    ===================================== */

    const suma = resultados.reduce((a, b) => a + b, 0);

    total.textContent = `Total: ${suma}`;


    /* =====================================
       6. ACTUALIZACIÓN DEL HISTORIAL
    ===================================== */

    historial.unshift(
        `${resultados.join(" + ")} = ${suma}`
    );

    // Conservamos solamente las últimas 10 tiradas
    historial.splice(10);

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
   7. EVENTOS
===================================== */

// Ejecutamos tirarDados cuando se pulsa el botón
lanzar.addEventListener("click", tirarDados);
