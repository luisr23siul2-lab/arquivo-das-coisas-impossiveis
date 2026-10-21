/* Personalize este arquivo: documentos, pistas e carta final estão abaixo. */
const screens = [...document.querySelectorAll(".screen")];
const modal = document.getElementById("documentModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalSymbol = document.getElementById("modalSymbol");
const modalBody = document.getElementById("modalBody");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const feedback = document.getElementById("passwordFeedback");

const documents = {
  individual: {
    meta: "REGISTRO A-01 · IDENTIFICAÇÃO",
    symbol: "♙",
    title: "Indivíduo extraordinário",
    body: `
      <p><strong>Nome:</strong> ElzZzma </p>
      <p><strong>Classificação:</strong> presença rara, comportamento imprevisível e tendência preocupante a participar de acontecimentos que depois precisam ser explicados.</p>
      <p><strong>Observação do arquivista:</strong> há indícios de que o indivíduo consegue transformar uma conversa simples em uma história que não deveria ser repetida fora de contexto.</p>
      <p>Apesar das anomalias, sua presença é considerada uma ocorrência positiva para os que o conhecem.</p>
      <div class="clue"><strong>Nota marginal:</strong> “A primeira letra indica aquilo que se procura.”</div>`
  },
  letter: {
    meta: "REGISTRO A-02 · CORRESPONDÊNCIA",
    symbol: "✉",
    title: "Correspondência interceptada",
    body: `
      <p>Ao responsável pelo Setor IV,</p>
      <p>O incidente permanece sem explicação. As testemunhas apresentam versões contraditórias, risadas inexplicáveis e uma quantidade preocupante de detalhes que não podem ser incluídos neste relatório.</p>
      <p>Recomenda-se não perguntar “lembra daquela vez?” sem estar preparado para ouvir a história inteira.</p>
      <p>Não foi encontrado qualquer objeto de valor no local. Ainda assim, os envolvidos insistem que alguma coisa importante foi preservada.</p>
      <div class="clue"><strong>Nota marginal:</strong> “Não é um objeto, mas pode ser guardado.”</div>`
  },
  bestiary: {
    meta: "REGISTRO A-03 · BESTIÁRIO",
    symbol: "♜",
    title: "Bestiário de anomalias",
    body: `
      <p><strong>Espécie:</strong> <em>Amicus interminabilis</em></p>
      <p><strong>Habitat:</strong> conversas inesperadas, noites prolongadas e situações que começam com “só uma coisa rápida”.</p>
      <p><strong>Alimentação:</strong> humor duvidoso, referências obscuras e a energia de quem deveria estar fazendo outra coisa.</p>
      <p><strong>Comportamento:</strong> a criatura pode parecer distante durante certos períodos, mas a ligação entre os membros do grupo não desaparece por isso.</p>
      <div class="clue"><strong>Nota marginal:</strong> “Torna-se mais forte quando compartilhado, mesmo à distância. Sete letras. Começa com V.”</div>`
  }
};

const readDocs = new Set();
let previousFocus = null;

function showScreen(id) {
  screens.forEach(screen => {
    const active = screen.id === `screen-${id}`;
    screen.hidden = !active;
    screen.classList.toggle("active", active);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  progressText.textContent = `${readDocs.size} / 3`;
  progressFill.style.width = `${(readDocs.size / 3) * 100}%`;
  document.querySelectorAll("[data-doc]").forEach(card => {
    if (readDocs.has(card.dataset.doc)) card.classList.add("read");
  });
}

function openDocument(key) {
  if (key === "sealed") {
    showScreen("riddle");
    return;
  }
  const doc = documents[key];
  if (!doc) return;
  previousFocus = document.activeElement;
  modalMeta.textContent = doc.meta;
  modalSymbol.textContent = doc.symbol;
  modalTitle.textContent = doc.title;
  modalBody.innerHTML = doc.body;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}

document.getElementById("beginButton").addEventListener("click", () => showScreen("catalog"));
document.querySelectorAll("[data-doc]").forEach(card => {
  card.addEventListener("click", () => openDocument(card.dataset.doc));
});
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalDone").addEventListener("click", () => {
  const openKey = Object.keys(documents).find(key => documents[key].title === modalTitle.textContent);
  if (openKey) readDocs.add(openKey);
  updateProgress();
  closeModal();
});
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
document.getElementById("toRiddleButton").addEventListener("click", () => showScreen("riddle"));
document.getElementById("backToCatalog").addEventListener("click", () => showScreen("catalog"));
document.getElementById("hintButton").addEventListener("click", () => {
  document.getElementById("extraHint").hidden = false;
  document.getElementById("hintButton").textContent = "Pista adicional revelada";
});
document.getElementById("passwordForm").addEventListener("submit", event => {
  event.preventDefault();
  const answer = document.getElementById("passwordInput").value
    .trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (answer === "vinculo") {
    feedback.textContent = "O selo reconheceu a palavra. Acesso concedido.";
    feedback.classList.remove("error");
    window.setTimeout(() => showScreen("locked"), 550);
  } else {
    feedback.textContent = "O selo permanece fechado. Examine as notas marginais dos três documentos.";
    feedback.classList.add("error");
  }
});
document.getElementById("revealLetterButton").addEventListener("click", () => showScreen("letter"));
document.getElementById("finishButton").addEventListener("click", () => showScreen("finish"));
document.getElementById("restartButton").addEventListener("click", () => {
  readDocs.clear();
  updateProgress();
  document.getElementById("passwordInput").value = "";
  feedback.textContent = "";
  feedback.classList.remove("error");
  document.getElementById("extraHint").hidden = true;
  document.getElementById("hintButton").textContent = "Solicitar pista adicional";
  showScreen("intro");
});

/* Botão de som opcional: não toca áudio sem uma fonte real de som. */
document.getElementById("soundToggle").addEventListener("click", event => {
  const button = event.currentTarget;
  const on = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!on));
  button.innerHTML = on ? '♫ <span>Som</span>' : '♪ <span>Som indisponível</span>';
  button.title = "Para adicionar som, inclua um arquivo de áudio seu e um controle de reprodução.";
});

updateProgress();
