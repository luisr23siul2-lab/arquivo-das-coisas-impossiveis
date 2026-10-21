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
const fragmentProgressText = document.getElementById("fragmentProgressText");
const fragmentProgressFill = document.getElementById("fragmentProgressFill");
const fragmentNote = document.getElementById("fragmentNote");

// Personalize o nome aqui. Você não precisa alterar a lógica do site.
const friendName = "ElzZzMa";
const fragments = {
  individual: { title: "Fragmento VX-01 · Presença", text: "Algumas pessoas deixam marcas no arquivo mesmo quando não estão na mesma sala.", symbol: "⌁" },
  letter: { title: "Fragmento VX-02 · Memória", text: "Uma lembrança compartilhada continua existindo mesmo depois que a conversa termina.", symbol: "✉" },
  bestiary: { title: "Fragmento VX-03 · Vínculo", text: "O que conecta duas pessoas não precisa ser visto para ser real.", symbol: "∞" }
};
const foundFragments = new Set();

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
      <div class="clue"><strong>Nota marginal:</strong> “A primeira letra indica aquilo que se procura.”</div>
      <div class="fragment-action-area"><button class="fragment-button" type="button" data-fragment="individual">Examinar fragmento VX-01 ↗</button><p class="fragment-result" data-fragment-result="individual" hidden></p></div>`
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
      <div class="clue"><strong>Nota marginal:</strong> “Não é um objeto, mas pode ser guardado.”</div>
      <div class="fragment-action-area"><button class="fragment-button" type="button" data-fragment="letter">Examinar fragmento VX-02 ↗</button><p class="fragment-result" data-fragment-result="letter" hidden></p></div>`
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
      <div class="clue"><strong>Nota marginal:</strong> “Torna-se mais forte quando compartilhado, mesmo à distância. Sete letras. Começa com V.”</div>
      <div class="fragment-action-area"><button class="fragment-button" type="button" data-fragment="bestiary">Examinar fragmento VX-03 ↗</button><p class="fragment-result" data-fragment-result="bestiary" hidden></p></div>`
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
    else card.classList.remove("read");
  });
}

function updateFragmentProgress() {
  fragmentProgressText.textContent = `${foundFragments.size} / 3`;
  fragmentProgressFill.style.width = `${(foundFragments.size / 3) * 100}%`;
  if (foundFragments.size === 3) {
    fragmentNote.textContent = "Todos os fragmentos foram reunidos. O registro começa a fazer sentido.";
  } else {
    fragmentNote.textContent = `Você recuperou ${foundFragments.size} de 3 fragmentos. Eles ficam guardados enquanto a investigação estiver aberta.`;
  }
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
  if (foundFragments.has(key)) {
    const fragmentButton = modalBody.querySelector(`[data-fragment="${key}"]`);
    const fragmentResult = modalBody.querySelector(`[data-fragment-result="${key}"]`);
    const fragment = fragments[key];
    if (fragmentButton && fragment && fragmentResult) {
      fragmentButton.disabled = true;
      fragmentButton.textContent = "Fragmento recuperado ✓";
      fragmentResult.hidden = false;
      fragmentResult.innerHTML = `<span class="fragment-image-placeholder" aria-label="Espaço reservado para uma imagem"><span>${fragment.symbol}</span><small>ESPAÇO PARA IMAGEM</small></span><strong>${fragment.title}</strong><span>${fragment.text}</span>`;
    }
  }
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

// Os botões são inseridos dentro dos documentos dinamicamente; por isso usamos delegação de eventos.
modalBody.addEventListener("click", event => {
  const button = event.target.closest("[data-fragment]");
  if (!button) return;
  const key = button.dataset.fragment;
  const fragment = fragments[key];
  if (!fragment) return;

  foundFragments.add(key);
  button.disabled = true;
  button.textContent = "Fragmento recuperado ✓";
  const result = modalBody.querySelector(`[data-fragment-result="${key}"]`);
  if (result) {
    result.hidden = false;
    result.innerHTML = `<span class="fragment-image-placeholder" aria-label="Espaço reservado para uma imagem"><span>${fragment.symbol}</span><small>ESPAÇO PARA IMAGEM</small></span><strong>${fragment.title}</strong><span>${fragment.text}</span>`;
  }
  updateFragmentProgress();
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

// Painel deslizante de ambientação. O áudio começa somente após um toque do visitante.
const soundToggle = document.getElementById("soundToggle");
const ambiencePanel = document.getElementById("ambiencePanel");
const ambienceBackdrop = document.getElementById("ambienceBackdrop");

function closeAmbience() {
  ambiencePanel.hidden = true;
  ambienceBackdrop.hidden = true;
  soundToggle.setAttribute("aria-expanded", "false");
}
function toggleAmbience() {
  const opening = ambiencePanel.hidden;
  ambiencePanel.hidden = !opening;
  ambienceBackdrop.hidden = !opening;
  soundToggle.setAttribute("aria-expanded", String(opening));
}
soundToggle.addEventListener("click", toggleAmbience);
document.getElementById("ambienceClose").addEventListener("click", closeAmbience);
ambienceBackdrop.addEventListener("click", closeAmbience);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !ambiencePanel.hidden) closeAmbience();
});

function setupSound(kind, defaultVolume) {
  const audio = document.getElementById(`${kind}Audio`);
  const slider = document.getElementById(`${kind}Volume`);
  const volumeValue = document.getElementById(`${kind}VolumeValue`);
  const playButton = document.getElementById(`${kind}Play`);
  const status = document.getElementById(`${kind}Status`);
  audio.volume = defaultVolume / 100;

  slider.addEventListener("input", () => {
    audio.volume = Number(slider.value) / 100;
    volumeValue.textContent = `${slider.value}%`;
  });
  audio.addEventListener("error", () => {
    status.textContent = `Não encontrei sounds/${kind}.mp3 ainda.`;
  });
  playButton.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      playButton.textContent = kind === "fire" ? "▶ Reproduzir lareira" : "▶ Reproduzir chuva";
      return;
    }
    try {
      await audio.play();
      playButton.textContent = kind === "fire" ? "Ⅱ Pausar lareira" : "Ⅱ Pausar chuva";
      status.textContent = "Reproduzindo";
    } catch (error) {
      status.textContent = `Adicione seu áudio em sounds/${kind}.mp3 e publique o arquivo.`;
    }
  });
  audio.addEventListener("pause", () => {
    playButton.textContent = kind === "fire" ? "▶ Reproduzir lareira" : "▶ Reproduzir chuva";
  });
}
setupSound("fire", 35);
setupSound("rain", 25);

document.getElementById("restartButton").addEventListener("click", () => {
  foundFragments.clear();
  updateFragmentProgress();
});

updateProgress();
updateFragmentProgress();
