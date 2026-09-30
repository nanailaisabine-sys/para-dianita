// =============== CONFIGURACIÓN ===============
const INICIO = new Date("2026-10-01T00:00:00");
const CUMPLE = new Date("2026-10-17T00:00:00");

// Link de la página principal (lo pones cuando esté publicada)
const LINK_REGALO = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanUxdTJrdGpjMXY1MGVuNzY0c3VlamtqYTA4M3g5OTZsamd6ejNjOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z9jh7tAeMzrjMGxAfQ/giphy.gif";

// Tu número de WhatsApp: 52 + tus 10 dígitos, sin espacios ni signos
const TELEFONO = "525576700185";

// Para probar: pon un número del 1 al 17 y verás ese día.
// ANTES DE PUBLICAR DEBE QUEDAR EN null
const DIA_SIMULADO = null;

// Un mensaje por día: el primero es el 1 de octubre, el último el 17
const MENSAJES = [
    "Faltan 16 días para tu cumpleaños y yo ya empecé a contarlos como si fuera el mío.",           // 1 oct (faltan 16)
    "Dicen que las cuentas regresivas son para cosas importantes… por eso hice una para ti.",       // 2 oct (faltan 15)
    "Faltan dos semanas, y cada día me alegra más haberte conocido.",                                // 3 oct (faltan 14)
    "Dicen que el 13 es de mala suerte, pero yo tengo la suerte de platicar contigo.",                // 4 oct (faltan 13)
    "Hoy solo quiero recordarte que tu sonrisa me arregla el día, aunque no lo sepas.",              // 5 oct (faltan 12)
    "Faltan 11 días y ya estoy pensando cómo sacarte una sonrisa ese día.",                           // 6 oct (faltan 11)
    "Última vez en dos dígitos. Un día más cerca de celebrarte.",                                     // 7 oct (faltan 10)
    "Si pudiera pedir un deseo por ti, sería que este año te trate tan bonito como tú tratas a los demás.", // 8 oct (faltan 9)
    "Me gusta mucho cómo eres, y quería decírtelo hoy, sin ningún motivo.",                           // 9 oct (faltan 8)
    "Una semana. Siete días para celebrar algo que yo celebro seguido: que existas.",                 // 10 oct (faltan 7)
    "Faltan 6 días. Los ratos contigo son de mis favoritos.",                                         // 11 oct (faltan 6)
    "¿Ya pensaste qué pastel quieres? Yo ya estoy pensando en verte.",                                // 12 oct (faltan 5)
    "Tienes una forma de ser que hace todo más ligero.",                                              // 13 oct (faltan 4)
    "Ojalá sepas lo bonito que es coincidir contigo.",                                                // 14 oct (faltan 3)
    "Pasado mañana es tu día, y hoy solo quiero decirte que me encanta tenerte cerca.",               // 15 oct (faltan 2)
    "Mañana es tu cumpleaños y quiero ser de los primeros en felicitarte 🎂",                         // 16 oct (falta 1)
    "¡Hoy es tu cumpleaños! <3"                                                                       // 17 oct (¡HOY!)
];

// Una foto o GIF por día, en el mismo orden que los mensajes.
// Si un día no lleva imagen, déjalo como ""
const FOTOS = [
    "imagen1.jpg",    // día 1
    "imagen2.jpg",    // día 2
    "imagen3.jpg",    // día 3
    "imagen4.jpg",    // día 4
    "imagen5.jpg",    // día 5
    "imagen6.jpg",    // día 6
    "imagen7.jpg",    // día 7
    "imagen8.jpg",    // día 8
    "imagen9.jpg",    // día 9
    "imagen10.jpg",   // día 10
    "imagen11.jpg",   // día 11
    "imagen12.jpg",   // día 12
    "imagen13.jpg",   // día 13
    "imagen14.jpg",   // día 14
    "imagen15.jpg",   // día 15
    "imagen16.jpg",   // día 16
    "imagen17.jpg"    // día 17
];

// =============== ¿QUÉ DÍA ES? ===============
function calcularDia() {
    if (DIA_SIMULADO !== null) {
        return DIA_SIMULADO;
    }
    let diferencia = new Date() - INICIO;
    return Math.floor(diferencia / 86400000) + 1;
}

let dia = Math.min(calcularDia(), 17);

// =============== DÍAS LEÍDOS (se guardan en el navegador) ===============
let leidos = JSON.parse(localStorage.getItem("diasLeidos")) || [];

function marcarLeido(numero) {
    if (!leidos.includes(numero)) {
        leidos.push(numero);
        localStorage.setItem("diasLeidos", JSON.stringify(leidos));
    }
}

// =============== FONDO QUE CAMBIA CON LOS DÍAS ===============
function convertirARGB(hex) {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
    ];
}

function mezclarColor(colorA, colorB, avance) {
    let a = convertirARGB(colorA);
    let b = convertirARGB(colorB);
    let mezcla = [];
    for (let k = 0; k < 3; k++) {
        mezcla.push(Math.round(a[k] + (b[k] - a[k]) * avance));
    }
    return `rgb(${mezcla[0]}, ${mezcla[1]}, ${mezcla[2]})`;
}

let avance = Math.max(0, Math.min(1, (dia - 1) / 16));
let colorArriba = mezclarColor("#1a1030", "#b83b5e", avance);
let colorAbajo = mezclarColor("#5b2a55", "#ff8a80", avance);
document.body.style.backgroundImage = `linear-gradient(160deg, ${colorArriba}, ${colorAbajo})`;

// =============== BARRA DE PROGRESO ===============
let relleno = document.querySelector("#relleno");
let textoProgreso = document.querySelector("#texto-progreso");

if (dia >= 1) {
    textoProgreso.textContent = `Día ${dia} de 17`;
} else {
    textoProgreso.textContent = "Empieza el 1 de octubre";
}

setTimeout(function() {
    relleno.style.width = (Math.max(dia, 0) / 17 * 100) + "%";
}, 200);

// =============== CUENTA REGRESIVA ===============
let subtitulo = document.querySelector("#subtitulo");
let contador = document.querySelector("#contador");
let botonRegalo = document.querySelector("#boton-regalo");

function dosDigitos(numero) {
    return String(numero).padStart(2, "0");
}

function actualizarCuenta() {
    let diferencia = CUMPLE - new Date();

    if (dia >= 17 || diferencia <= 0) {
        subtitulo.textContent = "¡Hoy es tu cumpleaños! 🎂";
        contador.classList.add("oculto");
        botonRegalo.classList.remove("oculto");
        if (LINK_REGALO !== "") {
            botonRegalo.href = LINK_REGALO;
        }
        clearInterval(intervalo);
        return;
    }

    let segundosTotales = Math.floor(diferencia / 1000);
    document.querySelector("#dias").textContent = Math.floor(segundosTotales / 86400);
    document.querySelector("#horas").textContent = dosDigitos(Math.floor((segundosTotales % 86400) / 3600));
    document.querySelector("#minutos").textContent = dosDigitos(Math.floor((segundosTotales % 3600) / 60));
    document.querySelector("#segundos").textContent = dosDigitos(segundosTotales % 60);
}

let intervalo = setInterval(actualizarCuenta, 1000);
actualizarCuenta();

// =============== PRÓXIMO MENSAJE ===============
let proximo = document.querySelector("#proximo");

function actualizarProximo() {
    if (dia >= 17) {
        proximo.classList.add("oculto");
        clearInterval(intervaloProximo);
        return;
    }

    let siguiente = new Date(INICIO.getTime() + Math.max(dia, 0) * 86400000);
    let diferencia = siguiente - new Date();

    if (diferencia <= 0) {
        // Si llegó la medianoche con la página abierta, se recarga sola
        if (DIA_SIMULADO === null) {
            location.reload();
        }
        proximo.textContent = "";
        return;
    }

    let minutosTotales = Math.ceil(diferencia / 60000);
    let horas = Math.floor(minutosTotales / 60);
    let minutos = minutosTotales % 60;
    proximo.textContent = `Tu siguiente mensaje llega en ${horas} h ${minutos} min ♡`;
}

let intervaloProximo = setInterval(actualizarProximo, 1000);
actualizarProximo();

// =============== MENSAJES ===============
let tarjetaMensaje = document.querySelector("#mensaje-dia");
let etiqueta = document.querySelector("#etiqueta-dia");
let textoMensaje = document.querySelector("#texto-mensaje");
let fotoMensaje = document.querySelector("#foto-mensaje");
let botonResponder = document.querySelector("#boton-responder");
let aviso = document.querySelector("#aviso");
let celdas = [];
let intervaloEscritura;
let temporizadorAviso;

// Si una foto no se encuentra, se oculta en lugar de verse rota
fotoMensaje.addEventListener("error", function() {
    fotoMensaje.classList.add("oculto");
});

function mostrarFoto(numero) {
    let ruta = FOTOS[numero - 1];

    fotoMensaje.classList.add("oculto");

    if (ruta !== "") {
        fotoMensaje.src = ruta;
        setTimeout(function() {
            fotoMensaje.classList.remove("oculto");
        }, 50);
    }
}

function actualizarBotonResponder(numero) {
    let texto = `Sobre tu mensaje del día ${numero}: `;
    botonResponder.href = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(texto)}`;
    botonResponder.classList.remove("oculto");
}

function escribirTexto(texto) {
    clearInterval(intervaloEscritura);
    let letras = Array.from(texto);
    let posicion = 0;
    textoMensaje.textContent = "";
    textoMensaje.classList.add("escribiendo");

    intervaloEscritura = setInterval(function() {
        if (posicion >= letras.length) {
            clearInterval(intervaloEscritura);
            textoMensaje.classList.remove("escribiendo");
            return;
        }
        textoMensaje.textContent += letras[posicion];
        posicion++;
    }, 40);
}

function lluviaCorazones() {
    let corazon = confetti.shapeFromText({ text: "💗", scalar: 2 });
    confetti({
        shapes: [corazon],
        scalar: 2,
        particleCount: 25,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.4 }
    });
}

function marcarSeleccionada(numero) {
    for (let celda of celdas) {
        celda.classList.remove("seleccionado");
    }
    celdas[numero - 1].classList.add("seleccionado");
}

function mostrarMensaje(numero, animado) {
    tarjetaMensaje.classList.remove("cerrado");
    etiqueta.textContent = `Día ${numero} de 17 · ${numero} de octubre`;

    if (animado) {
        escribirTexto(MENSAJES[numero - 1]);
    } else {
        clearInterval(intervaloEscritura);
        textoMensaje.classList.remove("escribiendo");
        textoMensaje.textContent = MENSAJES[numero - 1];
    }

    mostrarFoto(numero);
    actualizarBotonResponder(numero);
    marcarSeleccionada(numero);

    if (!leidos.includes(numero)) {
        marcarLeido(numero);
        lluviaCorazones();
        let insignia = celdas[numero - 1].querySelector(".insignia");
        if (insignia) {
            insignia.remove();
        }
    }
}

function mostrarSobre() {
    tarjetaMensaje.classList.add("cerrado");
    etiqueta.textContent = `Día ${dia} de 17 · ${dia} de octubre`;
    textoMensaje.textContent = "💌 Tienes un mensaje nuevo. Tócalo para abrirlo.";
    fotoMensaje.classList.add("oculto");
    botonResponder.classList.add("oculto");
    marcarSeleccionada(dia);
}

tarjetaMensaje.addEventListener("click", function() {
    if (tarjetaMensaje.classList.contains("cerrado")) {
        mostrarMensaje(dia, true);
    }
});

function avisarBloqueado(celda, numero) {
    celda.classList.add("temblar");
    setTimeout(function() {
        celda.classList.remove("temblar");
    }, 400);

    aviso.textContent = `Paciencia... este se abre el ${numero} de octubre ♡`;
    aviso.classList.add("visible");

    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function() {
        aviso.classList.remove("visible");
    }, 2500);
}

// =============== CALENDARIO ===============
let calendario = document.querySelector("#calendario");

for (let i = 1; i <= 17; i++) {
    let celda = document.createElement("div");
    celda.classList.add("dia");

    if (i <= dia) {
        celda.classList.add("abierto");
        celda.innerHTML = `<strong>${i}</strong>oct`;
        if (!leidos.includes(i)) {
            celda.innerHTML += `<span class="insignia">Nuevo</span>`;
        }
        celda.addEventListener("click", function() {
            mostrarMensaje(i, true);
        });
    } else {
        celda.innerHTML = `<strong>🔒</strong>${i} oct`;
        celda.addEventListener("click", function() {
            avisarBloqueado(celda, i);
        });
    }

    if (i === dia) {
        celda.classList.add("hoy");
    }

    calendario.appendChild(celda);
    celdas.push(celda);
}

// =============== AL ABRIR LA PÁGINA ===============
if (dia < 1) {
    etiqueta.textContent = "Todavía no empieza...";
    textoMensaje.textContent = "Tu primer mensaje llega el 1 de octubre ♡";
} else if (!leidos.includes(dia)) {
    mostrarSobre();
} else {
    mostrarMensaje(dia, false);
}
