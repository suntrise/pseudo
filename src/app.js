import { $ } from "./dom.js";
import { initEvents, updateOptionVisibility } from "./events.js";
import { applyLanguage, getSavedLang, loadI18n } from "./i18n.js";
import { loadHistory, loadMode, loadSession, state } from "./state.js";

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
  
  const topbar = $("app-title")?.closest(".topbar");
  if (topbar) {
    const updateTopbarShadow = () => {
      if (window.scrollY > 0) {
        topbar.classList.add("scrolled");
      } else {
        topbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", updateTopbarShadow, { passive: true });
    updateTopbarShadow();
  }
}

initializeApp();
