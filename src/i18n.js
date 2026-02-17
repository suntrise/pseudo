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
    "exe-btn": txt.exeVersion,
    "exe-btn-mobile": txt.exeVersion,
    "library-btn-top": txt.library,
    "library-btn-mobile": txt.library,
    "about-btn": txt.about,
    "about-btn-mobile": txt.about,
    "lang-btn": state.currentLang === "zh" ? txt.langEn : txt.langZh,
    "lang-btn-mobile": state.currentLang === "zh" ? txt.langEn : txt.langZh,
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
    "clear-history-btn": txt.historyClear,
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

  const buttons = ["process-btn", "clear-btn", "copy-btn", "history-btn", "library-btn"];
  const btnKeys = [txt.process, txt.clear, txt.copy, txt.history, txt.library];
  buttons.forEach((id, i) => {
    const btn = $(id);
    if (btn) btn.textContent = btnKeys[i];
  });

  $("about-content").innerHTML = txt.aboutContent;
}

export function getSavedLang() {
  return navigator.language?.startsWith("zh") ? "zh" : "en";
}
