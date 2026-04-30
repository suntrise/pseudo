import { $ } from "./dom.js";
import { initEvents, updateOptionVisibility } from "./events.js";
import { applyLanguage, getSavedLang, loadI18n } from "./i18n.js";
import { loadHistory, loadMode, loadSession, state } from "./state.js";
import { parseUrlParams, applyUrlParamsToUI, applyUrlConfigToUI } from "./url-params.js";

async function initializeApp() {
  await loadI18n();
  state.currentLang = getSavedLang();
  localStorage.setItem("pseudo-lang", state.currentLang);
  loadHistory();
  loadMode();

  const urlParams = parseUrlParams();

  await new Promise(r => setTimeout(r, 100));

  applyLanguage();
  initEvents();
  updateOptionVisibility();

  if (urlParams.text) {
    await applyUrlParamsToUI(urlParams);
  } else {
    applyUrlConfigToUI(urlParams);
    const session = loadSession();
    if (session.input) {
      $("input-text").value = session.input;
      $("output-text").value = session.output;
    }
  }
  
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
