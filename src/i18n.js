import { state, getState } from "./state.js";
import { $ } from "./dom.js";

const LANGUAGE_NAMES_FALLBACK = {
  "en": { name: "English", nativeName: "English" },
  "zh": { name: "Chinese", nativeName: "中文" }
};

function getLangInfo(langCode) {
  const [baseCode, region] = langCode.split("-");
  
  if (LANGUAGE_NAMES_FALLBACK[langCode]) {
    return LANGUAGE_NAMES_FALLBACK[langCode];
  }
  
  if (LANGUAGE_NAMES_FALLBACK[baseCode] && !region) {
    return LANGUAGE_NAMES_FALLBACK[baseCode];
  }
  
  try {
    const enDisplayNames = new Intl.DisplayNames(["en"], { type: "language", languageDisplay: "dialect" });
    const name = enDisplayNames.of(langCode) || baseCode;
    
    const nativeDisplayNames = new Intl.DisplayNames([baseCode], { type: "language" });
    const nativeName = nativeDisplayNames.of(langCode) || nativeDisplayNames.of(baseCode) || baseCode;
    
    return { name, nativeName };
  } catch (e) {
    return LANGUAGE_NAMES_FALLBACK[baseCode] || { name: langCode, nativeName: langCode };
  }
}

function buildSupportedLanguages(i18nData) {
  const langCodes = Object.keys(i18nData);
  return langCodes.map(code => {
    const info = getLangInfo(code);
    return {
      code,
      baseCode: code.split("-")[0],
      name: info.name,
      nativeName: info.nativeName
    };
  });
}

export async function loadI18n() {
  const basePath = window.BASE_PATH || './';
  const [i18nRes, metaRes] = await Promise.all([
    fetch(basePath + "data/i18n.json"),
    fetch(basePath + "data/metadata.json")
  ]);
  state.i18nData = await i18nRes.json();
  state.metadata = await metaRes.json();
  
  state.supportedLanguages = buildSupportedLanguages(state.i18nData);
}

function getLangFallback(langCode) {
  if (state.i18nData[langCode]) {
    return langCode;
  }
  const baseCode = langCode.split("-")[0];
  if (state.i18nData[baseCode]) {
    return baseCode;
  }
  const matchedLang = state.supportedLanguages?.find(l => l.code.startsWith(baseCode));
  if (matchedLang) {
    return matchedLang.code;
  }
  return Object.keys(state.i18nData)[0] || "en";
}

export function setLang(lang) {
  state.currentLang = lang;
  localStorage.setItem("pseudo-lang", lang);
  applyLanguage();
}

export function t() {
  const fallbackLang = getLangFallback(state.currentLang);
  return state.i18nData[fallbackLang] || state.i18nData["en"];
}

export function applyLanguage() {
  const txt = t();
  if (!txt) return;

  const s = getState();
  const version = state.metadata.version || "";
  const titleWithVersion = version ? `${txt.title} v${version}` : txt.title;
  document.title = txt.title;

  const currentLangObj = state.supportedLanguages?.find(l => l.code === state.currentLang) || { nativeName: "Language" };

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
    "about-title-text": txt.aboutTitle,
    "lang-modal-title": txt.langModalTitle || "Select Language"
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
    { id: "lang-btn", text: txt.langBtn || currentLangObj.nativeName, icon: "language" },
    { id: "lang-btn-mobile", text: txt.langBtn || currentLangObj.nativeName, icon: "language" },
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

  renderLangList();
}

function renderLangList() {
  const langList = $("lang-list");
  if (!langList) return;
  
  const currentLang = state.currentLang;
  
  langList.innerHTML = state.supportedLanguages?.map(lang => `
    <button class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}" type="button" aria-pressed="${lang.code === currentLang}">
      <span class="lang-native">${lang.nativeName}</span>
      <span class="lang-name">${lang.name}</span>
      ${lang.code === currentLang ? '<span class="material-icons lang-check">check</span>' : ''}
    </button>
  `).join('') || '';
}

export function getSavedLang() {
  const savedLang = localStorage.getItem("pseudo-lang");
  if (savedLang && state.supportedLanguages?.some(l => l.code === savedLang)) {
    return savedLang;
  }
  
  const browserLang = navigator.language || "en";
  const [langPart, regionPart] = browserLang.split('-');
  
  if (state.supportedLanguages?.some(l => l.code === browserLang)) {
    return browserLang;
  }
  
  if (regionPart && state.supportedLanguages?.some(l => l.code === `${langPart}-${regionPart}`)) {
    return `${langPart}-${regionPart}`;
  }
  
  if (state.supportedLanguages?.some(l => l.code === langPart)) {
    return langPart;
  }
  
  const matchedLang = state.supportedLanguages?.find(l => l.code.startsWith(langPart));
  if (matchedLang) {
    return matchedLang.code;
  }
  
  return Object.keys(state.i18nData)[0] || "en";
}
