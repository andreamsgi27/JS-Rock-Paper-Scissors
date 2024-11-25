// Array que contiene las posibles opciones del juego
var posibilidades = ["piedra", "papel", "tijera"];

// Variables para interactuar con los elementos de la página
const nombreInput = document.querySelector('input[name="nombre"]');
const partidasInput = document.querySelector('input[name="partidas"]');
const jugarBtn = document.querySelector('button:nth-of-type(1)');
const yaBtn = document.querySelector('h2 button');
const resetBtn = document.querySelector('button:nth-of-type(4)');
const actualSpan = document.getElementById("actual");
const totalSpan = document.getElementById("total");
const jugadorImgs = document.querySelectorAll("#jugador img");
const maquinaImg = document.querySelector("#maquina img");
const historial = document.getElementById("historial");

// Variables del juego
var nombreJugador = "";
var totalPartidas = 0;
var partidasJugadas = 0;
var seleccionJugador = -1;

// Iniciar una partida
jugarBtn.addEventListener("click", comenzarPartida);

// Evento para seleccionar piedra, papel, tijera
jugadorImgs.forEach((img, index) => {
    img.addEventListener("click", () => seleccionarOpcion(index));
});

// Evento para empezar cuando se haga clic en "Ya"
yaBtn.addEventListener("click", realizarTirada);

// Evento para el RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'RESET');
    
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            alert("Nueva partida"); // Mensaje de nueva partida
            nombreInput.disabled = false;
            partidasInput.disabled = false;
            partidasInput.value = 0;
            actualSpan.textContent = "0";
            totalSpan.textContent = "0";
            maquinaImg.src = "img/defecto.png"; // Imagen por defecto de la máquina al resetear
        });
    } else {
        console.error("Botón RESET no encontrado"); // Error si no se encuentra RESET
    }
});

// Inicia la partida, valida los campos y resetea los valores
function comenzarPartida() {
    const nombre = nombreInput.value.trim();
    const partidas = parseInt(partidasInput.value, 10);

    // Validación del nombre
    if (!validarNombre(nombre)) {
        nombreInput.classList.add("fondoRojo");
    } else {
        nombreInput.classList.remove("fondoRojo");
    }

    // Validación del número de partidas
    if (!validarPartidas(partidas)) {
        partidasInput.classList.add("fondoRojo");
    } else {
        partidasInput.classList.remove("fondoRojo");
    }

    // Si las validaciones son correctas, se comienza la partida
    if (validarNombre(nombre) && validarPartidas(partidas)) {
        nombreJugador = nombre;
        totalPartidas = partidas;
        partidasJugadas = 0;
        actualSpan.textContent = "0";
        totalSpan.textContent = totalPartidas;

        nombreInput.disabled = true;
        partidasInput.disabled = true;
    }
}

// Que el nombre sea válido
function validarNombre(nombre) {
    return nombre.length > 3 && isNaN(nombre.charAt(0)); // Nombre debe ser mayor a 3 caracteres y no empezar con un número
}

// Que el número de partidas sea mayor que 0
function validarPartidas(partidas) {
    return partidas > 0;
}

// Función para seleccionar piedra, papel, tijera
function seleccionarOpcion(index) {
    seleccionJugador = index; // Guarda la selección del jugador
    jugadorImgs.forEach((img, i) => {
        img.className = i === index ? "seleccionado" : "noSeleccionado"; // Marca la opción seleccionada
        img.src = `img/${posibilidades[i]}Jugador.png`; // Cambia la imagen del jugador
    });
}

// Función para realizar la tirada y el resultado
function realizarTirada() {
    if (partidasJugadas >= totalPartidas) {
        return; // Si ya se jugaron todas las partidas, no hace nada
    }

    if (seleccionJugador === -1) {
        return; // Si no se ha seleccionado una opción, no realiza la tirada
    }

    const seleccionMaquina = Math.floor(Math.random() * posibilidades.length); // Selecciona aleatoriamente la opción de la máquina
    maquinaImg.src = `img/${posibilidades[seleccionMaquina]}Ordenador.png`; // Muestra la opción de la máquina

    const resultado = determinarGanador(seleccionJugador, seleccionMaquina); // Determina el resultado del juego
    actualizarHistorial(resultado); // Actualiza el historial con el resultado

    partidasJugadas++; // Incrementa el contador de partidas jugadas
    actualSpan.textContent = partidasJugadas; // Muestra el número de partidas jugadas
}

// Función para determinar quién gana la partida
function determinarGanador(jugador, maquina) {
    if (jugador === maquina) return "Empate"; // Si ambos eligen lo mismo es empate
    if ((jugador + 1) % posibilidades.length === maquina) return "Gana la máquina"; // La máquina gana
    return `Gana ${nombreJugador}`; // El jugador gana
}

// Función para actualizar el historial de resultados
function actualizarHistorial(resultado) {
    const li = document.createElement("li");
    li.textContent = resultado; // Crea un nuevo elemento de lista con el resultado
    historial.appendChild(li); // Añade el resultado al historial
}
