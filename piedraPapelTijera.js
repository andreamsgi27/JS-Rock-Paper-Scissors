// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

const nombreInput = document.querySelector('input[name="nombre"]');
const partidasInput = document.querySelector('input[name="partidas"]');
const jugarBtn = document.querySelector('button:nth-of-type(1)'); // Primer botón
const yaBtn = document.querySelector('h2 button'); // Selecciona el botón ¡YA! en el h2
const resetBtn = document.querySelector('button:nth-of-type(4)'); // Último botón
const actualSpan = document.getElementById("actual");
const totalSpan = document.getElementById("total");
const jugadorImgs = document.querySelectorAll("#jugador img");
const maquinaImg = document.querySelector("#maquina img");
const historial = document.getElementById("historial");

var nombreJugador = "";
var totalPartidas = 0;
var partidasJugadas = 0;
var seleccionJugador = -1; // Variable para almacenar la selección del jugador

jugarBtn.addEventListener("click", comenzarPartida);
jugadorImgs.forEach((img, index) => {
    img.addEventListener("click", () => seleccionarOpcion(index));
});
yaBtn.addEventListener("click", realizarTirada);
resetBtn.addEventListener("click", resetearJuego);

function comenzarPartida() {
    const nombre = nombreInput.value.trim();
    const partidas = parseInt(partidasInput.value, 10);

    // Validar nombre
    if (!validarNombre(nombre)) {
        nombreInput.classList.add("fondoRojo");
    } else {
        nombreInput.classList.remove("fondoRojo");
    }

    // Validar partidas
    if (!validarPartidas(partidas)) {
        partidasInput.classList.add("fondoRojo");
    } else {
        partidasInput.classList.remove("fondoRojo");
    }

    // Si ambos campos son válidos, proceder
    if (validarNombre(nombre) && validarPartidas(partidas)) {
        nombreJugador = nombre;
        totalPartidas = partidas;
        partidasJugadas = 0;
        actualSpan.textContent = "0";
        totalSpan.textContent = totalPartidas;

        nombreInput.disabled = true;
        partidasInput.disabled = true;

        // Limpiar el historial al comenzar una nueva partida
        historial.innerHTML = "";
    }
}

function validarNombre(nombre) {
    return nombre.length > 3 && isNaN(nombre.charAt(0));
}

function validarPartidas(partidas) {
    return partidas > 0;
}

function seleccionarOpcion(index) {
    seleccionJugador = index; // Guardar la selección del jugador
    jugadorImgs.forEach((img, i) => {
        img.className = i === index ? "seleccionado" : "noSeleccionado";
        img.src = `img/${posibilidades[i]}Jugador.png`; // Cambiar imagen del jugador.
    });
}

function realizarTirada() {
    if (partidasJugadas >= totalPartidas) {
        alert("Ya has jugado todas las partidas.");
        return; // Si ya se jugaron todas las partidas, no hace nada
    }

    if (seleccionJugador === -1) {
        alert("Selecciona una opción antes de jugar.");
        return; // Si no se ha seleccionado nada, no se ejecuta el resto
    }

    // Si el jugador ha seleccionado una opción, continúa con el juego
    const seleccionMaquina = Math.floor(Math.random() * posibilidades.length);
    maquinaImg.src = `img/${posibilidades[seleccionMaquina]}Ordenador.png`;

    const resultado = determinarGanador(seleccionJugador, seleccionMaquina);
    actualizarHistorial(resultado);

    partidasJugadas++;
    actualSpan.textContent = partidasJugadas;

    if (partidasJugadas === totalPartidas) {
        alert("Juego terminado. Gracias por jugar.");
    }
}

function determinarGanador(jugador, maquina) {
    if (jugador === maquina) return "Empate";
    if ((jugador + 1) % posibilidades.length === maquina) return "Gana la máquina";
    return `Gana ${nombreJugador}`; // Mostrar el nombre del jugador
}

function actualizarHistorial(resultado) {
    const li = document.createElement("li");
    li.textContent = resultado;
    historial.appendChild(li);
}

function resetearJuego() {
    nombreInput.disabled = false;
    partidasInput.disabled = false;
    nombreInput.value = "";
    partidasInput.value = "0";
    actualSpan.textContent = "0";
    totalSpan.textContent = "0";
    historial.innerHTML = "";
    jugadorImgs.forEach(img => {
        img.src = "img/defecto.png";
        img.className = "noSeleccionado";
    });
    maquinaImg.src = "img/defecto.png";
    seleccionJugador = -1;
    totalPartidas = 0;
    partidasJugadas = 0;
}