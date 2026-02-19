import { state, loadHistory, loadMode, loadSession } from "./state.js";
import { loadI18n, applyLanguage, getSavedLang } from "./i18n.js";
import { initEvents, updateOptionVisibility } from "./events.js";
import { $ } from "./dom.js";

async function initializeApp() {
  await loadI18n();
  state.currentLang = getSavedLang();
  localStorage.setItem("pseudo-lang", state.currentLang);
  loadHistory();
  loadMode();

  const session = loadSession();
  $("input-text").value = session.input;
  $("output-text").value = session.output;

  await new Promise(r => setTimeout(r, 100));

  applyLanguage();
  initEvents();
  updateOptionVisibility();
}

initializeApp();
