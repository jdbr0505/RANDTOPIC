/* =========================================================
   RANDTOPIC — lógica de la app
   Estructura: datos -> estado -> utilidades -> pantallas -> eventos
   ========================================================= */

/* ---------- 1. DATOS: banco de temas ---------- */
const TOPICS = [
  // CIENCIA
  { cat: "Ciencia", title: "El efecto Mandela", text: "Es un fenómeno psicológico en el que un grupo grande de personas comparte un recuerdo falso de un mismo evento. El nombre viene de la falsa creencia colectiva de que Nelson Mandela murió en prisión en los años 80. Se estudia como ejemplo de cómo la memoria humana reconstruye —en vez de grabar— los recuerdos, mezclando información real con sugerencias externas." },
  { cat: "Ciencia", title: "La paradoja de Fermi", text: "Plantea la contradicción entre la alta probabilidad estadística de que exista vida extraterrestre y la ausencia total de evidencia de contacto. Enrico Fermi la formuló preguntando simplemente: '¿dónde está todo el mundo?'. Existen decenas de hipótesis para resolverla, desde que la vida inteligente es rarísima hasta que las civilizaciones se autodestruyen antes de poder viajar entre estrellas." },
  { cat: "Ciencia", title: "CRISPR y la edición genética", text: "CRISPR-Cas9 es una herramienta molecular que permite cortar y modificar el ADN con una precisión sin precedentes, como un 'editor de texto' para genes. Se originó a partir de un sistema de defensa bacteriano contra virus. Hoy se investiga para curar enfermedades hereditarias, mejorar cultivos y hasta revertir mutaciones causantes de cáncer." },
  { cat: "Ciencia", title: "La entropía y la flecha del tiempo", text: "La entropía mide el desorden de un sistema, y la segunda ley de la termodinámica dice que siempre tiende a aumentar en el universo. Esto explica por qué el tiempo parece moverse en una sola dirección: es mucho más probable que un vaso se rompa a que se reconstruya solo. Es una de las pocas leyes físicas que distingue el pasado del futuro." },
  { cat: "Ciencia", title: "Los telómeros y el envejecimiento", text: "Los telómeros son las 'tapas protectoras' de los extremos de los cromosomas, similares al plástico en la punta de una agujeta. Cada vez que una célula se divide, se acortan un poco, y cuando se agotan la célula deja de dividirse o muere. Por eso son uno de los principales sospechosos biológicos detrás del envejecimiento humano." },

  // HISTORIA
  { cat: "Historia", title: "La Biblioteca de Alejandría", text: "Fue uno de los centros de conocimiento más grandes de la Antigüedad, con cientos de miles de rollos de papiro sobre ciencia, filosofía y literatura. Su destrucción, ocurrida en varias etapas a lo largo de siglos y no en un solo incendio como sugiere el mito, sigue siendo símbolo de la pérdida irreparable de conocimiento humano." },
  { cat: "Historia", title: "La Peste Negra", text: "Entre 1347 y 1351, esta pandemia de peste bubónica mató entre un tercio y la mitad de la población europea. Transformó radicalmente la economía medieval: la escasez de mano de obra fortaleció a los campesinos frente a los señores feudales, acelerando el fin del feudalismo y sembrando las bases de cambios sociales posteriores." },
  { cat: "Historia", title: "El código de Hammurabi", text: "Es uno de los conjuntos de leyes escritas más antiguos que se conocen, tallado en una estela de piedra en Babilonia hace casi 3800 años. Su principio más famoso, 'ojo por ojo, diente por diente', establecía castigos proporcionales según la clase social del ofensor, reflejando una de las primeras nociones formales de justicia." },
  { cat: "Historia", title: "La ruta de la seda", text: "No era un camino único, sino una red de rutas comerciales que conectaba Asia, Oriente Medio, África y Europa durante más de mil años. Por ella no solo viajaban seda y especias, sino también ideas, religiones, tecnologías y enfermedades, convirtiéndola en uno de los primeros motores de la globalización." },
  { cat: "Historia", title: "La caída del muro de Berlín", text: "El 9 de noviembre de 1989, tras semanas de protestas masivas en Europa del Este, el muro que dividía Berlín desde 1961 cayó casi por accidente, tras un anuncio mal comunicado sobre viajes al oeste. Simboliza el fin de la Guerra Fría y la reunificación de Alemania un año después." },

  // ARTE Y CULTURA
  { cat: "Arte", title: "El movimiento surrealista", text: "Surgido en la década de 1920, buscaba liberar el pensamiento de la razón lógica explorando el inconsciente, los sueños y el azar. Artistas como Dalí, Magritte y Miró crearon imágenes perturbadoras y oníricas influenciados por el psicoanálisis de Freud, cuestionando qué es 'real' en el arte." },
  { cat: "Arte", title: "La sección áurea en el arte", text: "Es una proporción matemática (aproximadamente 1.618) que aparece en la naturaleza, desde conchas hasta galaxias, y que artistas y arquitectos han usado durante siglos por considerarla estéticamente armoniosa. Se le atribuye presencia en obras como 'La Gioconda' y el Partenón, aunque su uso deliberado a veces es objeto de debate entre historiadores." },
  { cat: "Arte", title: "El arte callejero y Banksy", text: "El street art nació como una forma de expresión al margen del sistema tradicional del arte, usando la ciudad como lienzo. Banksy, artista anónimo, lo llevó a la fama global combinando sátira política y técnicas de stencil, cuestionando el consumismo y el propio mercado del arte con obras que a veces se autodestruyen tras venderse." },
  { cat: "Arte", title: "El jazz y la improvisación", text: "Nacido a principios del siglo XX en comunidades afroamericanas de Nueva Orleans, el jazz revolucionó la música al poner la improvisación en el centro de la creación artística. Mezcla estructuras armónicas complejas con libertad expresiva individual, y su desarrollo está profundamente ligado a la lucha por los derechos civiles en Estados Unidos." },

  // TECNOLOGÍA
  { cat: "Tecnología", title: "Las redes neuronales artificiales", text: "Son sistemas computacionales inspirados —de forma simplificada— en cómo funcionan las neuronas del cerebro. Aprenden ajustando millones de 'pesos' internos a partir de ejemplos, en vez de seguir reglas escritas a mano. Son la base de tecnologías como el reconocimiento de voz, la visión artificial y los modelos de lenguaje." },
  { cat: "Tecnología", title: "La computación cuántica", text: "En vez de bits que valen 0 o 1, usa 'qubits' que pueden existir en superposición de ambos estados a la vez, gracias a la mecánica cuántica. Esto permite, en teoría, resolver ciertos problemas exponencialmente más rápido que las computadoras clásicas, como romper ciertos tipos de cifrado o simular moléculas complejas." },
  { cat: "Tecnología", title: "Blockchain más allá de las criptomonedas", text: "Es un registro digital distribuido entre muchos ordenadores, donde cada bloque de información se enlaza criptográficamente al anterior, haciendo casi imposible alterarlo sin que se note. Más allá del dinero digital, se explora para votaciones seguras, trazabilidad de alimentos y contratos que se ejecutan solos." },
  { cat: "Tecnología", title: "La ley de Moore", text: "Es la observación, hecha en 1965 por Gordon Moore, de que el número de transistores en un chip se duplica aproximadamente cada dos años. Durante décadas impulsó la industria tecnológica, aunque hoy se acerca a límites físicos, lo que empuja a la industria hacia nuevas arquitecturas como los chips cuánticos o neuromórficos." },

  // ESPACIO
  { cat: "Espacio", title: "Los agujeros negros", text: "Son regiones del espacio donde la gravedad es tan intensa que ni la luz puede escapar, formadas tras el colapso de estrellas masivas. En 2019 se obtuvo la primera imagen real de uno, confirmando predicciones de la teoría de la relatividad de Einstein. En su interior, las leyes conocidas de la física dejan de tener sentido." },
  { cat: "Espacio", title: "La materia oscura", text: "Es una forma de materia invisible que no emite ni absorbe luz, pero cuya existencia se infiere por su efecto gravitacional sobre galaxias enteras. Se estima que constituye cerca del 27% del universo, frente a apenas un 5% de materia ordinaria, pero hasta hoy nadie ha logrado detectarla directamente." },
  { cat: "Espacio", title: "Las lunas con potencial de vida", text: "Europa (de Júpiter) y Encélado (de Saturno) esconden océanos de agua líquida bajo gruesas capas de hielo, calentados por fuerzas de marea. Son de los lugares más prometedores del sistema solar para buscar vida microbiana, y varias misiones espaciales planean perforar o sobrevolar sus superficies en las próximas décadas." },
  { cat: "Espacio", title: "El telescopio James Webb", text: "Lanzado en 2021, observa el universo principalmente en luz infrarroja, lo que le permite ver a través de nubes de polvo y captar galaxias extremadamente antiguas y lejanas. Su espejo de 6.5 metros, hecho de segmentos de berilio recubiertos de oro, se despliega en el espacio como un origami de precisión." },

  // PSICOLOGÍA
  { cat: "Psicología", title: "El efecto Dunning-Kruger", text: "Describe cómo las personas con poca habilidad o conocimiento en un área tienden a sobrestimar su propia competencia, mientras que los expertos suelen subestimar la suya. Ocurre porque reconocer la propia incompetencia requiere justamente la habilidad que falta, generando una curiosa ceguera hacia los propios límites." },
  { cat: "Psicología", title: "La memoria a corto plazo", text: "Es un sistema de capacidad limitada —clásicamente descrita como 'siete más menos dos' elementos— que retiene información por segundos o minutos antes de que se pierda o se consolide en la memoria a largo plazo. Técnicas como la repetición, la asociación o explicar en voz alta ayudan a fortalecer ese paso a la memoria duradera." },
  { cat: "Psicología", title: "El sesgo de confirmación", text: "Es la tendencia a buscar, interpretar y recordar información que confirma nuestras creencias previas, ignorando la que las contradice. Afecta desde decisiones cotidianas hasta el consumo de noticias, y es una de las razones por las que las opiniones polarizadas resisten tanto a la evidencia contraria." },
  { cat: "Psicología", title: "El flow o estado de flujo", text: "Descrito por el psicólogo Mihaly Csikszentmihalyi, es un estado mental de concentración total en el que una persona se absorbe por completo en una actividad, perdiendo la noción del tiempo. Ocurre cuando el nivel de reto de la tarea coincide con el nivel de habilidad de la persona, ni demasiado fácil ni demasiado difícil." },

  // FILOSOFÍA
  { cat: "Filosofía", title: "El barco de Teseo", text: "Es una paradoja que pregunta: si un barco reemplaza, una por una, todas sus piezas originales, ¿sigue siendo el mismo barco? Y si con las piezas viejas se construye otro barco idéntico, ¿cuál de los dos es el 'verdadero'? Se usa para explorar qué define la identidad de algo a través del tiempo y el cambio." },
  { cat: "Filosofía", title: "El experimento mental del cerebro en una cubeta", text: "Plantea que no hay forma lógica de descartar que tu mente sea en realidad un cerebro flotando en un líquido, conectado a electrodos que simulan toda tu experiencia de 'realidad'. Es una versión moderna del escepticismo radical y una de las bases filosóficas detrás de películas como 'Matrix'." },
  { cat: "Filosofía", title: "El dilema del tranvía", text: "Un tranvía sin frenos va a atropellar a cinco personas; puedes desviarlo a otra vía donde matará solo a una. ¿Es correcto actuar? El dilema, y sus muchas variantes, se usa para contrastar dos formas de pensar la ética: por consecuencias (utilitarismo) versus por principios morales fijos (deontología)." },
  { cat: "Filosofía", title: "El mito de la caverna de Platón", text: "Platón imagina a unos prisioneros encadenados desde su nacimiento en una cueva, viendo solo sombras proyectadas en la pared y creyendo que esa es toda la realidad. Cuando uno logra salir y ve el mundo real, la alegoría plantea preguntas sobre el conocimiento, la ignorancia y lo difícil que es aceptar una verdad que contradice todo lo que creíamos saber." },

  // NATURALEZA
  { cat: "Naturaleza", title: "Las redes de micorrizas o 'wood wide web'", text: "Es una red subterránea de hongos que conecta las raíces de distintos árboles en un bosque, permitiéndoles intercambiar nutrientes, agua e incluso señales de alerta ante plagas. Algunos científicos la comparan con una especie de internet natural, donde los árboles más viejos ayudan a los más jóvenes a sobrevivir." },
  { cat: "Naturaleza", title: "La metamorfosis de las mariposas", text: "Dentro de la crisálida, la oruga no solo cambia de forma: gran parte de su cuerpo se disuelve en una especie de sopa celular que luego se reorganiza por completo en una mariposa. Sorprendentemente, estudios muestran que algunos recuerdos aprendidos como oruga pueden conservarse después de esta transformación radical." },
  { cat: "Naturaleza", title: "Los tardígrados, los seres casi indestructibles", text: "Son animales microscópicos capaces de sobrevivir a temperaturas extremas, radiación letal, el vacío del espacio y décadas de deshidratación total entrando en un estado llamado criptobiosis. Su resistencia extrema los convierte en modelo de estudio para entender los límites de la vida misma." },
  { cat: "Naturaleza", title: "La comunicación de los cetáceos", text: "Ballenas y delfines usan sonidos complejos —cantos que pueden viajar cientos de kilómetros en el océano— para comunicarse, orientarse y posiblemente transmitir información social entre generaciones. Algunas poblaciones desarrollan 'dialectos' propios, lo que sugiere una forma rudimentaria de cultura." },

  // ECONOMÍA
  { cat: "Economía", title: "La inflación y por qué ocurre", text: "Es el aumento sostenido y generalizado de los precios, lo que reduce el poder adquisitivo del dinero con el tiempo. Puede originarse por exceso de demanda, aumento de costos de producción o expansión monetaria excesiva. Los bancos centrales suben las tasas de interés para intentar frenarla, encareciendo el crédito y enfriando el consumo." },
  { cat: "Economía", title: "La economía del comportamiento", text: "Combina psicología y economía para mostrar que las personas no siempre toman decisiones racionales, como asume la economía clásica. Conceptos como la 'aversión a la pérdida' —donde perder algo duele más de lo que place ganar lo mismo— explican por qué actuamos de forma predeciblemente irracional en decisiones financieras cotidianas." },
  { cat: "Economía", title: "Qué es el PIB y sus límites", text: "El Producto Interno Bruto mide el valor total de bienes y servicios producidos en un país durante un periodo, y se usa como termómetro estándar de la economía. Sin embargo, no captura desigualdad, trabajo no remunerado ni impacto ambiental, por lo que cada vez más economistas proponen indicadores alternativos de bienestar." },

  // MITOLOGÍA
  { cat: "Mitología", title: "Prometeo y el fuego robado", text: "En la mitología griega, Prometeo desafió a los dioses robando el fuego del Olimpo para entregárselo a la humanidad, símbolo del conocimiento y la tecnología. Como castigo, Zeus lo encadenó a una roca donde un águila le devoraba el hígado cada día, que volvía a regenerarse cada noche, en un castigo eterno." },
  { cat: "Mitología", title: "Ragnarök, el fin del mundo nórdico", text: "En la mitología nórdica, Ragnarök es la batalla final donde dioses como Odín y Thor se enfrentan a gigantes y monstruos, resultando en la destrucción casi total del cosmos. Pero el mito no termina en desesperanza: tras el cataclismo, un nuevo mundo renace, fértil y renovado, gobernado por una nueva generación de dioses." },
  { cat: "Mitología", title: "Anubis y el juicio de las almas", text: "En la mitología egipcia, Anubis, el dios con cabeza de chacal, guiaba a los muertos y pesaba su corazón contra la pluma de la diosa Maat, símbolo de la verdad. Si el corazón pesaba más que la pluma, cargado de culpas, era devorado por Ammit, y el alma dejaba de existir para siempre." },

  // CURIOSIDADES / VARIOS
  { cat: "Curiosidades", title: "Por qué bostezamos y por qué es contagioso", text: "No se sabe con certeza por qué bostezamos, pero hay teorías que lo ligan a la regulación de la temperatura del cerebro o a un mecanismo de alerta social. El contagio del bostezo al ver bostezar a otros parece relacionarse con la empatía, ya que suele ser más frecuente entre personas emocionalmente cercanas." },
  { cat: "Curiosidades", title: "El idioma que moldea el pensamiento", text: "La hipótesis de Sapir-Whorf sugiere que el idioma que hablamos influye en cómo percibimos el mundo. Un ejemplo famoso es una lengua aborigen australiana que no usa 'izquierda' o 'derecha', sino puntos cardinales todo el tiempo, lo que hace que sus hablantes desarrollen una orientación espacial excepcional." },
  { cat: "Curiosidades", title: "La miel que nunca caduca", text: "Arqueólogos han encontrado miel comestible en tumbas egipcias de más de 3000 años. Su bajísimo contenido de agua y su acidez natural crean un ambiente hostil para bacterias y hongos, lo que la convierte en uno de los pocos alimentos verdaderamente imperecederos si se almacena correctamente." },
  { cat: "Curiosidades", title: "El fenómeno Baader-Meinhof", text: "Es esa sensación de que, tras aprender algo nuevo, empiezas a verlo por todas partes. No es que de repente aparezca más seguido, sino que tu cerebro ahora le presta atención selectiva a algo que antes ignoraba, un sesgo cognitivo llamado 'sesgo de frecuencia'." },

  // DEPORTE
  { cat: "Deporte", title: "La ciencia detrás del 'muro' del maratón", text: "Alrededor del kilómetro 30, muchos corredores agotan casi por completo sus reservas de glucógeno muscular, obligando al cuerpo a quemar grasa de forma menos eficiente. Esto provoca fatiga extrema repentina, conocida como 'pegarse contra el muro', y es una de las razones por las que la estrategia de ritmo importa tanto como el entrenamiento físico." },
  { cat: "Deporte", title: "El origen olímpico de los Juegos", text: "Los Juegos Olímpicos antiguos se celebraron por primera vez en Olimpia, Grecia, en el año 776 a.C., como parte de un festival religioso dedicado a Zeus. Durante su celebración se declaraba una tregua sagrada entre ciudades-estado en guerra, para permitir que atletas y espectadores viajaran con seguridad." },

  // MÚSICA / CINE
  { cat: "Música", title: "Por qué la música nos da 'escalofríos'", text: "Ciertos pasajes musicales —sobre todo cambios armónicos inesperados— pueden activar el sistema de recompensa del cerebro liberando dopamina, la misma sustancia asociada a la comida o el placer. Este fenómeno, conocido como 'frisson', ocurre con más frecuencia en personas con mayor conectividad entre las áreas auditivas y emocionales del cerebro." },
  { cat: "Cine", title: "El montaje Kuleshov", text: "Un experimento del cineasta soviético Lev Kuleshov mostró el mismo plano del rostro neutro de un actor intercalado con distintas imágenes (un plato de sopa, un ataúd, una mujer). El público interpretó emociones distintas en el mismo rostro según el contexto, demostrando el poder del montaje para crear significado más allá de lo filmado." },
];

/* ---------- 2. ESTADO ---------- */
const STUDY_SECONDS = 15 * 60;
const SPEAK_SECONDS = 60;

const state = {
  currentTopic: null,
  timer: { remaining: 0, total: 0, running: false, intervalId: null, phase: null },
  duel: null, // { active, players: [p1, p2], turnIndex, ratings: [n, n] }
};

const els = {};
["splash", "home", "reveal", "study", "speak", "summary", "mytopics", "duel-setup", "duel-rate", "duel-summary"].forEach((id) => {
  els[id] = document.getElementById(`screen-${id}`);
});

/* ---------- 3. UTILIDADES ---------- */
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

function showScreen(name) {
  Object.values(els).forEach((el) => el.classList.remove("active"));
  els[name].classList.add("active");
}

function fmtTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- temas personalizados ("Mis temas") ---------- */
const CUSTOM_TOPICS_KEY = "randtopic_custom_topics_v1";

function getCustomTopics() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_TOPICS_KEY)) || []; }
  catch { return []; }
}

function saveCustomTopics(list) {
  localStorage.setItem(CUSTOM_TOPICS_KEY, JSON.stringify(list));
}

function addCustomTopic(cat, title) {
  const list = getCustomTopics();
  list.unshift({ cat, title });
  saveCustomTopics(list);
  renderMyTopicsList();
}

function deleteCustomTopic(index) {
  const list = getCustomTopics();
  list.splice(index, 1);
  saveCustomTopics(list);
  renderMyTopicsList();
}

function renderMyTopicsList() {
  const list = getCustomTopics();
  const ul = qs("#mytopic-list");
  const empty = qs("#mytopic-empty");
  ul.innerHTML = "";
  empty.style.display = list.length ? "none" : "block";
  list.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "mytopic-item";
    li.innerHTML = `<span class="mytopic-item-cat">${escapeHtml(t.cat)}</span><span class="mytopic-item-title">${escapeHtml(t.title)}</span>`;
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "mytopic-delete";
    delBtn.setAttribute("aria-label", "Eliminar tema");
    delBtn.textContent = "×";
    delBtn.addEventListener("click", () => deleteCustomTopic(i));
    li.appendChild(delBtn);
    ul.appendChild(li);
  });
}

function getTopicPool() {
  return TOPICS.concat(getCustomTopics());
}

function pickRandomTopic(excludeTitle) {
  let pool = getTopicPool();
  if (excludeTitle && pool.length > 1) {
    pool = pool.filter((t) => t.title !== excludeTitle);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ---------- audio: beep sencillo con WebAudio (sin archivos externos) ---------- */
let audioCtx;
function beep(times = 3) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let t = audioCtx.currentTime;
    for (let i = 0; i < times; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
      t += 0.4;
    }
  } catch (e) { /* audio no disponible, se ignora */ }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
}

/* ---------- localStorage: historial y racha ---------- */
const STORAGE_KEY = "randtopic_history_v1";

function getHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveHistoryEntry(entry) {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 200)));
  updateStatsUI();
}

function computeStreak(history) {
  if (!history.length) return 0;
  const days = [...new Set(history.map((h) => h.date))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  for (const day of days) {
    const cursorStr = cursor.toISOString().slice(0, 10);
    if (day === cursorStr) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

function updateStatsUI() {
  const history = getHistory();
  qs("#stat-count").textContent = history.length;
  qs("#stat-streak").textContent = computeStreak(history);
}

/* ---------- 4. TIMER genérico ---------- */
function startTimer(totalSeconds, phase, onTick, onDone) {
  clearInterval(state.timer.intervalId);
  state.timer = { remaining: totalSeconds, total: totalSeconds, running: true, phase, intervalId: null };
  onTick(state.timer.remaining, state.timer.total);
  state.timer.intervalId = setInterval(() => {
    if (!state.timer.running) return;
    state.timer.remaining -= 1;
    onTick(state.timer.remaining, state.timer.total);
    if (state.timer.remaining <= 0) {
      clearInterval(state.timer.intervalId);
      onDone();
    }
  }, 1000);
}

function setRingProgress(ringEl, fraction) {
  const circumference = 2 * Math.PI * 90;
  ringEl.style.strokeDashoffset = circumference * (1 - fraction);
}

/* ---------- 5. PANTALLAS ---------- */

/* Home */
function goHome() {
  clearInterval(state.timer.intervalId);
  state.duel = null;
  showScreen("home");
}

/* Reveal: animación de "ruleta" de títulos y luego fija el tema (solo categoría + título, sin pistas) */
function revealTopic() {
  const titleEl = qs("#reveal-title");
  const catEl = qs("#reveal-cat");
  const card = qs("#reveal-card");

  showScreen("reveal");
  card.classList.add("shuffling");
  catEl.textContent = "";

  let shuffles = 0;
  const maxShuffles = 14;
  const shuffleInterval = setInterval(() => {
    const t = pickRandomTopic();
    titleEl.textContent = t.title;
    shuffles++;
    if (shuffles >= maxShuffles) {
      clearInterval(shuffleInterval);
      const finalTopic = pickRandomTopic(state.currentTopic?.title);
      state.currentTopic = finalTopic;
      titleEl.textContent = finalTopic.title;
      catEl.textContent = finalTopic.cat;
      card.classList.remove("shuffling");
      card.classList.add("landed");
      setTimeout(() => card.classList.remove("landed"), 500);
    }
  }, 70);
}

/* Devuelve " · Turno de X" cuando hay un duelo activo, o "" en modo individual */
function duelTurnSuffix() {
  if (state.duel && state.duel.active) {
    return ` · Turno de ${state.duel.players[state.duel.turnIndex]}`;
  }
  return "";
}

/* Study: 15 minutos */
function startStudyPhase() {
  showScreen("study");
  qs("#study-topic-title").textContent = state.currentTopic.title;
  qs("#study-phase-label").textContent = "FASE DE ESTUDIO" + duelTurnSuffix();
  const ring = qs("#study-ring-progress");
  const label = qs("#study-time-label");
  qs("#study-pause-btn").textContent = "Pausar";

  startTimer(
    STUDY_SECONDS,
    "study",
    (remaining, total) => {
      label.textContent = fmtTime(remaining);
      setRingProgress(ring, remaining / total);
    },
    () => {
      beep();
      startSpeakPhase();
    }
  );
}

/* Speak: 1 minuto */
function startSpeakPhase() {
  showScreen("speak");
  qs("#speak-topic-title").textContent = state.currentTopic.title;
  qs("#speak-phase-label").textContent = "¡A EXPLICAR EN VOZ ALTA!" + duelTurnSuffix();
  const ring = qs("#speak-ring-progress");
  const label = qs("#speak-time-label");

  startTimer(
    SPEAK_SECONDS,
    "speak",
    (remaining, total) => {
      label.textContent = fmtTime(remaining);
      setRingProgress(ring, remaining / total);
    },
    () => {
      beep(2);
      handleSpeakEnd();
    }
  );
}

/* Al terminar de hablar: a calificación individual, o a calificar al jugador del duelo */
function handleSpeakEnd() {
  if (state.duel && state.duel.active) {
    showDuelRateScreen();
  } else {
    finishSession(null);
  }
}

/* Summary (modo individual) */
function finishSession(confidence) {
  showScreen("summary");
  qs("#summary-topic-title").textContent = state.currentTopic.title;
  qsa("#screen-summary .confidence-btn").forEach((b) => b.classList.remove("selected"));
  if (confidence) {
    const btn = qs(`#screen-summary .confidence-btn[data-value="${confidence}"]`);
    if (btn) btn.classList.add("selected");
    saveHistoryEntry({
      title: state.currentTopic.title,
      cat: state.currentTopic.cat,
      confidence,
      date: new Date().toISOString().slice(0, 10),
    });
  }
}

/* ---------- Modo Duelo ---------- */
function beginDuel(e) {
  e.preventDefault();
  const p1 = qs("#duel-p1-name").value.trim() || "Jugador 1";
  const p2 = qs("#duel-p2-name").value.trim() || "Jugador 2";
  state.duel = { active: true, players: [p1, p2], turnIndex: 0, ratings: [null, null] };
  revealTopic();
}

function showDuelRateScreen() {
  showScreen("duel-rate");
  qs("#duel-rate-player").textContent = state.duel.players[state.duel.turnIndex];
  qs("#duel-rate-topic").textContent = state.currentTopic.title;
  qsa("#duel-rate-row .confidence-btn").forEach((b) => b.classList.remove("selected"));
}

function handleDuelRate(value) {
  state.duel.ratings[state.duel.turnIndex] = value;
  saveHistoryEntry({
    title: state.currentTopic.title,
    cat: state.currentTopic.cat,
    confidence: value,
    date: new Date().toISOString().slice(0, 10),
  });

  if (state.duel.turnIndex === 0) {
    state.duel.turnIndex = 1;
    startStudyPhase();
  } else {
    showDuelSummary();
  }
}

function showDuelSummary() {
  showScreen("duel-summary");
  const [p1, p2] = state.duel.players;
  const [r1, r2] = state.duel.ratings;

  qs("#duel-summary-title").textContent = state.currentTopic.title;
  qs("#duel-p1-label").textContent = p1;
  qs("#duel-p2-label").textContent = p2;
  qs("#duel-p1-score").textContent = r1 != null ? `${r1}/5` : "–";
  qs("#duel-p2-score").textContent = r2 != null ? `${r2}/5` : "–";

  const cardP1 = qs("#duel-result-p1");
  const cardP2 = qs("#duel-result-p2");
  cardP1.classList.remove("duel-winner");
  cardP2.classList.remove("duel-winner");

  let winnerText;
  if (r1 > r2) {
    cardP1.classList.add("duel-winner");
    winnerText = `🏆 ¡${p1} gana el duelo!`;
  } else if (r2 > r1) {
    cardP2.classList.add("duel-winner");
    winnerText = `🏆 ¡${p2} gana el duelo!`;
  } else {
    winnerText = "🤝 ¡Empate! Ambos lo hicieron igual de bien.";
  }
  qs("#duel-winner-text").textContent = winnerText;

  state.duel.active = false;
}

/* ---------- 6. EVENTOS ---------- */
window.addEventListener("DOMContentLoaded", () => {
  updateStatsUI();

  qs("#splash-play-btn").addEventListener("click", () => showScreen("home"));

  qs("#btn-random").addEventListener("click", revealTopic);
  qs("#reveal-start-btn").addEventListener("click", startStudyPhase);
  qs("#reveal-again-btn").addEventListener("click", revealTopic);
  qs("#reveal-home-btn").addEventListener("click", goHome);

  qs("#study-pause-btn").addEventListener("click", (e) => {
    state.timer.running = !state.timer.running;
    e.target.textContent = state.timer.running ? "Pausar" : "Reanudar";
  });
  qs("#study-skip-btn").addEventListener("click", () => {
    clearInterval(state.timer.intervalId);
    startSpeakPhase();
  });
  qs("#study-cancel-btn").addEventListener("click", goHome);

  qs("#speak-finish-btn").addEventListener("click", () => {
    clearInterval(state.timer.intervalId);
    handleSpeakEnd();
  });
  qs("#speak-cancel-btn").addEventListener("click", goHome);

  qsa("#screen-summary .confidence-btn").forEach((btn) => {
    btn.addEventListener("click", () => finishSession(Number(btn.dataset.value)));
  });

  qs("#summary-new-btn").addEventListener("click", revealTopic);
  qs("#summary-home-btn").addEventListener("click", goHome);

  qs("#btn-help").addEventListener("click", () => qs("#modal-help").classList.add("open"));
  qs("#btn-about").addEventListener("click", () => qs("#modal-about").classList.add("open"));
  qsa("[data-close-modal]").forEach((btn) =>
    btn.addEventListener("click", (e) => e.target.closest(".modal").classList.remove("open"))
  );

  /* Mis temas */
  qs("#home-mytopics-btn").addEventListener("click", () => {
    renderMyTopicsList();
    showScreen("mytopics");
  });
  qs("#mytopics-home-btn").addEventListener("click", goHome);
  qs("#mytopic-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const catInput = qs("#mytopic-cat");
    const titleInput = qs("#mytopic-title");
    const cat = catInput.value.trim();
    const title = titleInput.value.trim();
    if (!cat || !title) return;
    addCustomTopic(cat, title);
    catInput.value = "";
    titleInput.value = "";
    titleInput.focus();
  });

  /* Modo Duelo */
  qs("#home-duel-btn").addEventListener("click", () => showScreen("duel-setup"));
  qs("#duel-setup-form").addEventListener("submit", beginDuel);
  qs("#duel-setup-cancel-btn").addEventListener("click", goHome);
  qsa("#duel-rate-row .confidence-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleDuelRate(Number(btn.dataset.value)));
  });
  qs("#duel-new-btn").addEventListener("click", () => {
    state.duel = null;
    showScreen("duel-setup");
  });
  qs("#duel-summary-home-btn").addEventListener("click", goHome);

  // Registro del service worker para funcionamiento offline / instalación PWA
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
