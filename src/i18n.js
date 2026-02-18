import { state, getState } from "./state.js";
import { $ } from "./dom.js";

export async function loadI18n() {
  const basePath = window.BASE_PATH || './';
  const [i18nRes, metaRes] = await Promise.all([
    fetch(basePath + "data/i18n.json"),
    fetch(basePath + "data/metadata.json")
  ]);
  state.i18nData = await i18nRes.json();
  state.metadata = await metaRes.json();
}

export function setLang(lang) {
  state.currentLang = lang;
  localStorage.setItem("pseudo-lang", lang);
  applyLanguage();
}

export function t() {
  return state.i18nData[state.currentLang] || state.i18nData["en"];
}

export function applyLanguage() {
  const txt = t();
  if (!txt) return;

  const s = getState();
  const version = state.metadata.version || "";
  const titleWithVersion = version ? `${txt.title} v${version}` : txt.title;
  document.title = txt.title;

  const bindings = {
    "app-title": titleWithVersion,
    "label-mode-xa": txt.modeXA,
    "label-mode-xb": txt.modeXB,
    "label-suffix": txt.suffix,
    "suffix-none": txt.suffixNone,
    "suffix-ms": txt.suffixMS,
    "suffix-android": txt.suffixAndroid,
    "suffix-num": txt.suffixNum,
    "suffix-custom": txt.suffixCustom,
    "label-custom-prefix": txt.customPrefix,
    "label-custom-suffix": txt.customSuffix,
    "label-custom-repeat": txt.customRepeat,
    "label-custom-repeat-count": txt.customRepeatCount,
    "label-upper": txt.upper,
    "label-lower": txt.lower,
    "label-dbvowel": txt.doubleVowel,
    "label-dbvowel-count": txt.doubleVowelCount,
    "label-numcir": txt.circleNumber,
    "label-hash": txt.addHash,
    "label-hash-length": txt.hashLength,
    "label-preserve-esc": txt.preserveEsc,
    "history-title-text": txt.historyTitle,
    "library-title-text": txt.library,
    "about-title-text": txt.aboutTitle
  };

  for (const [id, value] of Object.entries(bindings)) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  const inputText = $("input-text");
  const outputText = $("output-text");
  if (inputText) inputText.setAttribute("label", txt.inputPlaceholder);
  if (outputText) outputText.setAttribute("label", txt.outputPlaceholder);

  const buttons = [
    { id: "process-btn", text: txt.process, icon: "translate" },
    { id: "clear-btn", text: txt.clear, icon: "clear" },
    { id: "copy-btn", text: txt.copy, icon: "content_copy" },
    { id: "history-btn", text: txt.history, icon: "history" },
    { id: "library-btn-top", text: txt.library, icon: "library_books" },
    { id: "library-btn-mobile", text: txt.library, icon: "library_books" },
    { id: "about-btn", text: txt.about, icon: "info" },
    { id: "about-btn-mobile", text: txt.about, icon: "info" },
    { id: "exe-btn", text: txt.exeVersion, icon: "code" },
    { id: "exe-btn-mobile", text: txt.exeVersion, icon: "code" },
    { id: "lang-btn", text: state.currentLang === "zh" ? txt.langEn : txt.langZh, icon: "language" },
    { id: "lang-btn-mobile", text: state.currentLang === "zh" ? txt.langEn : txt.langZh, icon: "language" },
    { id: "clear-history-btn", text: txt.historyClear, icon: "delete_sweep" },
    { id: "github-btn-mobile", text: "GitHub", icon: "open_in_new" }
  ];
  buttons.forEach(({ id, text, icon }) => {
    const btn = $(id);
    if (btn) {
      btn.innerHTML = `<span class="material-icons">${icon}</span>${text}`;
    }
  });

  $("about-content").innerHTML = txt.aboutContent;
}

export function getSavedLang() {
  const savedLang = localStorage.getItem("pseudo-lang");
  if (savedLang && (savedLang === "en" || savedLang === "zh")) {
    return savedLang;
  }
  return navigator.language?.startsWith("zh") ? "zh" : "en";
}
