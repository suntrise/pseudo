import { state } from "./state.js";
import { loadI18n, applyLanguage, getSavedLang } from "./i18n.js";
import { initEvents, updateOptionVisibility } from "./events.js";

async function initializeApp() {
  await loadI18n();
  state.currentLang = getSavedLang();

  await new Promise(r => setTimeout(r, 100));

  applyLanguage();
  initEvents();
  updateOptionVisibility();
}

initializeApp();
