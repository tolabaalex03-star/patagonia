// ========================================
// MINI JUEGO: DESAFÍO PATAGÓNICO
// ========================================

const preguntas = [
  {
    pregunta: "¿En qué provincia es tradicional la torta galesa?",
    opciones: ["Chubut", "Jujuy", "Misiones", "Salta"],
    correcta: 0,
    explicacion: "La torta galesa está ligada a la comunidad galesa que se estableció en Chubut."
  },
  {
    pregunta: "¿Qué comida es muy representativa de Santa Cruz y Chubut?",
    opciones: ["Humita", "Cordero patagónico", "Locro", "Tamales"],
    correcta: 1,
    explicacion: "El cordero patagónico es uno de los platos más conocidos de esas provincias."
  },
  {
    pregunta: "¿Qué pescado se aprecia en los lagos patagónicos?",
    opciones: ["Atún", "Sardina", "Trucha", "Merluza"],
    correcta: 2,
    explicacion: "La trucha es muy apreciada en la cocina de la zona cordillerana."
  },
  {
    pregunta: "¿En qué localidad rionegrina es conocido el curanto?",
    opciones: ["Colonia Suiza", "Las Grutas", "Viedma", "Choele Choel"],
    correcta: 0,
    explicacion: "Colonia Suiza, cerca de Bariloche, mantiene la tradición del curanto."
  },
  {
    pregunta: "¿Qué es la trashumancia que se practica en el norte neuquino?",
    opciones: ["Una danza", "Un postre", "El traslado estacional del ganado", "Una fiesta del lago"],
    correcta: 2,
    explicacion: "La trashumancia es el traslado estacional de los animales entre zonas de pastoreo."
  }
];

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;

const elementoPregunta = document.getElementById("pregunta");
const elementoOpciones = document.getElementById("opciones");
const elementoMensaje = document.getElementById("mensaje");
const elementoProgreso = document.getElementById("progreso");
const elementoMarcador = document.getElementById("marcador");
const elementoBarra = document.getElementById("barra");
const botonSiguiente = document.getElementById("siguiente");

function mostrarPregunta() {
  const actual = preguntas[preguntaActual];
  respondida = false;

  elementoPregunta.textContent = actual.pregunta;
  elementoProgreso.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  elementoMarcador.textContent = `Puntaje: ${puntaje}`;
  elementoBarra.style.width = `${(preguntaActual / preguntas.length) * 100}%`;
  elementoMensaje.textContent = "Elegí una respuesta para continuar.";
  botonSiguiente.disabled = true;
  botonSiguiente.textContent = preguntaActual === preguntas.length - 1
    ? "Ver resultado"
    : "Siguiente pregunta";

  elementoOpciones.innerHTML = "";

  actual.opciones.forEach((opcion, indice) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion";
    boton.textContent = opcion;
    boton.addEventListener("click", () => comprobarRespuesta(indice));
    elementoOpciones.appendChild(boton);
  });
}

function comprobarRespuesta(indiceElegido) {
  if (respondida) return;

  respondida = true;
  const actual = preguntas[preguntaActual];
  const botones = elementoOpciones.querySelectorAll("button");

  botones.forEach((boton, indice) => {
    boton.disabled = true;

    if (indice === actual.correcta) {
      boton.classList.add("correcta");
      boton.textContent += " ✓";
    } else if (indice === indiceElegido) {
      boton.classList.add("incorrecta");
      boton.textContent += " ✕";
    }
  });

  if (indiceElegido === actual.correcta) {
    puntaje++;
    elementoMensaje.textContent = `¡Muy bien! ${actual.explicacion}`;
  } else {
    elementoMensaje.textContent = `No es esa. ${actual.explicacion}`;
  }

  elementoMarcador.textContent = `Puntaje: ${puntaje}`;
  elementoBarra.style.width = `${((preguntaActual + 1) / preguntas.length) * 100}%`;
  botonSiguiente.disabled = false;
}

function avanzar() {
  if (!respondida) return;

  preguntaActual++;

  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  elementoProgreso.textContent = "Desafío terminado";
  elementoPregunta.textContent = `¡Conseguiste ${puntaje} de ${preguntas.length} puntos!`;
  elementoOpciones.innerHTML = "";

  if (puntaje === 5) {
    elementoMensaje.textContent = "¡Excelente! Sos un experto en la Patagonia.";
  } else if (puntaje >= 3) {
    elementoMensaje.textContent = "¡Muy bien! Aprendiste bastante sobre la región.";
  } else {
    elementoMensaje.textContent = "¡Buen intento! Podés volver a recorrer la página y jugar otra vez.";
  }

  elementoBarra.style.width = "100%";
  botonSiguiente.textContent = "Volver a jugar";
  botonSiguiente.disabled = false;
  botonSiguiente.removeEventListener("click", avanzar);
  botonSiguiente.addEventListener("click", reiniciarJuego, { once: true });
}

function reiniciarJuego() {
  preguntaActual = 0;
  puntaje = 0;
  botonSiguiente.removeEventListener("click", reiniciarJuego);
  mostrarPregunta();
}

botonSiguiente.addEventListener("click", avanzar);
mostrarPregunta();
