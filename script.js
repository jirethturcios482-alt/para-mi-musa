(() => {
  const KEY = "50diasParaTi.journey.v4";
  const START = new Date(2026, 9, 15);
  const $ = (id) => document.getElementById(id);
  const dayLabel = $("dayLabel");
  const progressText = $("progressText");
  const progressFill = $("progressFill");
  const noteButton = $("openNotes");
  const songButton = $("openSong");
  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const state = loadState();

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && typeof saved === "object") {
        return { currentDay: Math.min(50, Math.max(1, Number(saved.currentDay) || 1)), completed: saved.completed || {}, welcomed: !!saved.welcomed, finalSeen: !!saved.finalSeen };
      }
    } catch (_) { /* Start fresh if storage is unavailable or invalid. */ }
    return { currentDay: 1, completed: {}, welcomed: false, finalSeen: false };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_) { /* The current session still works if storage is disabled. */ }
  }
  function dayData(day) {
    if (!state.completed[day]) state.completed[day] = { notes: false, song: false };
    return state.completed[day];
  }
  function dateForDay(day) {
    const date = new Date(START);
    date.setDate(date.getDate() + day - 1);
    return `${date.getDate()} de ${monthNames[date.getMonth()]}`;
  }
  function render() {
    const day = state.currentDay;
    const done = dayData(day);
    dayLabel.textContent = `Día ${day} • ${dateForDay(day)}`;
    progressText.textContent = `Día ${day} de 50`;
    progressFill.style.width = `${day / 50 * 100}%`;
    $("startButton").textContent = state.welcomed ? "Volver a la sorpresa" : "¡Entonces, empecemos!";
    noteButton.disabled = !state.welcomed || done.notes;
    songButton.disabled = !state.welcomed || done.song;
    noteButton.innerHTML = done.notes ? `Notitas abiertas <span>✓</span>` : `Abrir mis notitas <span>→</span>`;
    songButton.innerHTML = done.song ? `Canción descubierta <span>✓</span>` : `Descubrir canción <span>→</span>`;
    $("dateNotice").textContent = state.welcomed ? "" : "Al empezar, tu recorrido comienza como Día 1 • 15 de octubre. ❤️";
    $("dateNotice").hidden = state.welcomed;
  }
  function showNotes() {
    if (!state.welcomed) return;
    const day = state.currentDay;
    const done = dayData(day);
    if (done.notes) return;
    const notes = window.loveNotes.slice((day - 1) * 2, day * 2);
    $("contentEyebrow").textContent = `DÍA ${day} • DOS NOTITAS PARA TI`;
    $("contentTitle").textContent = "Razones para amarte";
    $("contentBody").innerHTML = `<ol class="note-list">${notes.map(note => `<li>${escapeHtml(note)}</li>`).join("")}</ol>`;
    $("contentModal").showModal();
    done.notes = true;
    save(); finishDayIfReady(day);
    render();
  }
  function showSong() {
    if (!state.welcomed) return;
    const day = state.currentDay;
    const done = dayData(day);
    if (done.song) return;
    const song = window.playlistSongs[day - 1];
    $("contentEyebrow").textContent = `DÍA ${day} • UNA CANCIÓN PARA TI`;
    $("contentTitle").textContent = "Esta me recuerda a ti";
    const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
    $("contentBody").innerHTML = `<div class="song-reveal">${escapeHtml(song)}</div><a class="search-link" href="${search}" target="_blank" rel="noopener noreferrer">Buscar en YouTube ↗</a>`;
    $("contentModal").showModal();
    done.song = true;
    save(); finishDayIfReady(day);
    render();
  }
  function finishDayIfReady(day) {
    const done = dayData(day);
    if (!done.notes || !done.song) return;
    if (day === 50) {
      if (!state.finalSeen) {
        state.finalSeen = true;
        save();
        $("finalModal").showModal();
      }
      return;
    }
    state.currentDay = day + 1;
    save();
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  $("letterButton").addEventListener("click", () => $("welcomeModal").showModal());
  noteButton.addEventListener("click", showNotes);
  songButton.addEventListener("click", showSong);
  $("startButton").addEventListener("click", () => {
    state.welcomed = true;
    save();
    $("welcomeModal").close();
    render();
  });
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => $(button.dataset.close).close()));
  document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
    if (event.target === dialog && dialog.id !== "welcomeModal") dialog.close();
  }));
  render();
  if (!state.welcomed) $("welcomeModal").showModal();
})();

