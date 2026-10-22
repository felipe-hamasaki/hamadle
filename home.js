const translations = {
  pt: {
    lang: "pt-BR",
    title: "Hamadle — Um desafio por dia",
    description:
      "Entre no Hamadle, escolha seu universo e descubra o personagem do dia.",
    skip: "Pular para os jogos",
    home: "Hamadle, início",
    language: "Idioma",
    dark: "Modo escuro",
    how: "Como joga?",
    heroLead: "Tá na ponta",
    heroPrefix: "da ",
    heroWord: "língua",
    intro: "Você conhece. Você lembra. ",
    introStrong: "Ou acha que lembra.",
    introEnd: "Um personagem secreto por dia. Bora descobrir?",
    mascot: "Cutucar o mascote",
    collection: "Escolha sua obsessão",
    playGame: "Jogar Berserkdle",
    artCaption: "PARA QUEM SOBREVIVEU AO ECLIPSE.",
    category: "MANGÁ / ANIME",
    gameDescription:
      "Você reconheceria qualquer um do Bando do Falcão? Prove. Um personagem, suas pistas e a sua memória.",
    play: "Dar meu palpite",
    dailyFirst: "NOVO DESAFIO",
    dailySecond: "TODO DIA",
    footnote: "Acertou? Talento. Errou? Amanhã tem mais.",
    reset: "Rodada nova à meia-noite de Brasília",
    about: "Sobre o Hamadle",
    clubLead: "Um pequeno clube de ",
    clubStrong: "grandes palpites.",
    byFan: "FEITO POR FÃ.",
    backTop: "Voltar ao topo",
    back: "Lá pra cima",
    manual: "MANUAL DO BOM PALPITE",
    close: "Fechar instruções",
    helpTitle: "Acha que sabe?",
    helpIntro: "Então você já tem tudo de que precisa.",
    stepOneTitle: "Escolha seu universo.",
    stepOne: "Entre no jogo e tente descobrir o personagem secreto do dia.",
    stepTwoTitle: "Arrisque um nome.",
    stepTwo:
      "Cada palpite revela pistas. Compare os detalhes e vá afinando a sua teoria.",
    stepThreeTitle: "Junte as peças.",
    stepThree:
      "Acertou? Compartilhe o resultado pelo jogo. Amanhã, à meia-noite de Brasília, começa outra rodada.",
    helpPlay: "Entendi. Deixa comigo.",
  },
  en: {
    lang: "en",
    title: "Hamadle — A daily challenge",
    description:
      "Pick your universe and discover the character of the day on Hamadle.",
    skip: "Skip to games",
    home: "Hamadle, home",
    language: "Language",
    dark: "Dark mode",
    how: "How to play",
    heroLead: "On the tip of",
    heroPrefix: "your ",
    heroWord: "tongue",
    intro: "You know them. You remember. ",
    introStrong: "Or so you think.",
    introEnd: "One mystery character a day. Can you guess who?",
    mascot: "Poke the mascot",
    collection: "Pick your obsession",
    playGame: "Play Berserkdle",
    artCaption: "FOR THOSE WHO SURVIVED THE ECLIPSE.",
    category: "MANGA / ANIME",
    gameDescription:
      "Would you recognize anyone from the Band of the Hawk? Prove it. One character, a few clues, and your memory.",
    play: "Take a guess",
    dailyFirst: "A NEW CHALLENGE",
    dailySecond: "EVERY DAY",
    footnote: "Got it right? Skill. Got it wrong? Try again tomorrow.",
    reset: "New round at midnight, Brasília time",
    about: "About Hamadle",
    clubLead: "A little club for ",
    clubStrong: "big guesses.",
    byFan: "FAN-MADE.",
    backTop: "Back to top",
    back: "Back up",
    manual: "A GUIDE TO GUESSING",
    close: "Close instructions",
    helpTitle: "Think you know?",
    helpIntro: "Then you have everything you need.",
    stepOneTitle: "Pick your universe.",
    stepOne: "Enter the game and try to discover today’s mystery character.",
    stepTwoTitle: "Try a name.",
    stepTwo:
      "Each guess reveals clues. Compare the details and refine your theory.",
    stepThreeTitle: "Put it together.",
    stepThree:
      "Got it? Share your result from the game. A new round starts at midnight, Brasília time.",
    helpPlay: "Got it. Let me try.",
  },
  es: {
    lang: "es",
    title: "Hamadle — Un desafío cada día",
    description:
      "Entra en Hamadle, elige tu universo y descubre el personaje del día.",
    skip: "Ir a los juegos",
    home: "Hamadle, inicio",
    language: "Idioma",
    dark: "Modo oscuro",
    how: "¿Cómo jugar?",
    heroLead: "En la punta",
    heroPrefix: "de la ",
    heroWord: "lengua",
    intro: "Lo conoces. Lo recuerdas. ",
    introStrong: "O eso crees.",
    introEnd: "Un personaje secreto al día. ¿Lo descubrimos?",
    mascot: "Tocar la mascota",
    collection: "Elige tu obsesión",
    playGame: "Jugar a Berserkdle",
    artCaption: "PARA QUIENES SOBREVIVIERON AL ECLIPSE.",
    category: "MANGA / ANIME",
    gameDescription:
      "¿Reconocerías a cualquiera de la Banda del Halcón? Demuéstralo. Un personaje, sus pistas y tu memoria.",
    play: "Intentar adivinar",
    dailyFirst: "UN NUEVO DESAFÍO",
    dailySecond: "CADA DÍA",
    footnote: "¿Acertaste? Talento. ¿Fallaste? Mañana hay más.",
    reset: "Nueva ronda a medianoche, hora de Brasilia",
    about: "Sobre Hamadle",
    clubLead: "Un pequeño club de ",
    clubStrong: "grandes intuiciones.",
    byFan: "HECHO POR UN FAN.",
    backTop: "Volver arriba",
    back: "Hacia arriba",
    manual: "MANUAL PARA ADIVINAR",
    close: "Cerrar instrucciones",
    helpTitle: "¿Crees que lo sabes?",
    helpIntro: "Entonces ya tienes todo lo que necesitas.",
    stepOneTitle: "Elige tu universo.",
    stepOne:
      "Entra en el juego e intenta descubrir el personaje secreto del día.",
    stepTwoTitle: "Prueba con un nombre.",
    stepTwo:
      "Cada intento revela pistas. Compara los detalles y afina tu teoría.",
    stepThreeTitle: "Une las piezas.",
    stepThree:
      "¿Acertaste? Comparte tu resultado desde el juego. A medianoche, hora de Brasilia, comienza otra ronda.",
    helpPlay: "Entendido. Déjamelo a mí.",
  },
};

const preference = {
  get(key) {
    try {
      return localStorage.getItem(`hamadle:${key}`);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`hamadle:${key}`, value);
    } catch {
      /* Preferences still work for this page when storage is unavailable. */
    }
  },
};
const root = document.documentElement;
const languageSelect = document.querySelector("#language");
const themeButton = document.querySelector(".theme-button");
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
let themeChoice = preference.get("theme");
if (!["light", "dark"].includes(themeChoice)) themeChoice = null;
let language = Object.hasOwn(translations, preference.get("language"))
  ? preference.get("language")
  : "pt";

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  themeButton.setAttribute("aria-label", translations[language].dark);
  themeButton.title = translations[language].dark;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#181a21" : "#f6f3e9";
}

function applyLanguage(value) {
  language = Object.hasOwn(translations, value) ? value : "pt";
  const copy = translations[language];
  root.lang = copy.lang;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAria]);
  });
  languageSelect.querySelector(".language-current").textContent = {
    pt: "Português",
    en: "English",
    es: "Español",
  }[language];
  languageSelect.setAttribute(
    "aria-label",
    copy.language +
      ": " +
      languageSelect.querySelector(".language-current").textContent,
  );
  document
    .querySelector("#language-menu")
    .setAttribute("aria-label", copy.language);
  document
    .querySelectorAll("[data-language]")
    .forEach((option) =>
      option.setAttribute(
        "aria-checked",
        String(option.dataset.language === language),
      ),
    );
  applyTheme(root.dataset.theme);
}

applyTheme(themeChoice || (systemTheme.matches ? "dark" : "light"));
applyLanguage(language);
const languageMenu = document.querySelector("#language-menu");
const languageOptions = [...languageMenu.querySelectorAll("[data-language]")];
function closeLanguage(restore = false) {
  languageMenu.hidden = true;
  languageSelect.setAttribute("aria-expanded", "false");
  if (restore) languageSelect.focus();
}
function openLanguage() {
  languageMenu.hidden = false;
  languageSelect.setAttribute("aria-expanded", "true");
  languageOptions
    .find((option) => option.dataset.language === language)
    .focus();
}
languageSelect.addEventListener("click", () =>
  languageMenu.hidden ? openLanguage() : closeLanguage(),
);
languageSelect.addEventListener("keydown", (event) => {
  if (["ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
    openLanguage();
  }
});
languageOptions.forEach((option) =>
  option.addEventListener("click", () => {
    applyLanguage(option.dataset.language);
    preference.set("language", language);
    closeLanguage(true);
  }),
);
languageMenu.addEventListener("keydown", (event) => {
  const index = languageOptions.indexOf(document.activeElement);
  let next;
  if (event.key === "ArrowDown") next = (index + 1) % 3;
  if (event.key === "ArrowUp") next = (index + 2) % 3;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = 2;
  if (next !== undefined) {
    event.preventDefault();
    languageOptions[next].focus();
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeLanguage(true);
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".language-picker")) closeLanguage();
});
document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".language-picker")) closeLanguage();
});
themeButton.addEventListener("click", () => {
  themeChoice = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(themeChoice);
  preference.set("theme", themeChoice);
});
systemTheme.addEventListener("change", (event) => {
  if (!themeChoice) applyTheme(event.matches ? "dark" : "light");
});

const dialog = document.querySelector("#help-dialog");
const helpButton = document.querySelector("[data-open-help]");
helpButton.addEventListener("click", () => dialog.showModal());
dialog
  .querySelector(".close-button")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () =>
  helpButton.focus({ preventScroll: true }),
);

const mascot = document.querySelector(".mascot-button");
const pupils = document.querySelector(".pupils");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
let pokes = 0;
let resetAnimation;
let frame;

document.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || !finePointer.matches) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const bounds = mascot.getBoundingClientRect();
    const dx = Math.max(
      -7,
      Math.min(7, (event.clientX - bounds.left - bounds.width / 2) / 30),
    );
    const dy = Math.max(
      -8,
      Math.min(8, (event.clientY - bounds.top - bounds.height / 2) / 30),
    );
    pupils.style.transform = `translate(${dx}px, ${dy}px)`;
  });
});
document.addEventListener("pointerleave", () => {
  cancelAnimationFrame(frame);
  pupils.style.transform = "";
});
reducedMotion.addEventListener("change", () => {
  cancelAnimationFrame(frame);
  pupils.style.transform = "";
});

mascot.addEventListener("click", () => {
  pokes += 1;
  mascot.classList.remove("is-poked");
  clearTimeout(resetAnimation);
  requestAnimationFrame(() => mascot.classList.add("is-poked"));
  resetAnimation = setTimeout(() => mascot.classList.remove("is-poked"), 600);
  if (pokes % 5 !== 0 || reducedMotion.matches) return;
  const bounds = mascot.getBoundingClientRect();
  for (let index = 0; index < 18; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.setAttribute("aria-hidden", "true");
    piece.style.left = `${bounds.left + bounds.width / 2}px`;
    piece.style.top = `${bounds.top + bounds.height / 2}px`;
    piece.style.background = ["#273bcf", "#ff835c", "#bcb443"][index % 3];
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 350}px`);
    piece.style.setProperty("--dy", `${(Math.random() - 0.6) * 300}px`);
    piece.style.setProperty("--spin", `${Math.random() * 500}deg`);
    document.body.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), {
      once: true,
    });
    setTimeout(() => piece.remove(), 1200);
  }
});
