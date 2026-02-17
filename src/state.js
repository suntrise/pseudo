export const state = {
  i18nData: {},
  metadata: {},
  currentLang: "en",
  currentMode: "XA",
  processingHistory: [],
  charLib: null
};

export function getState() {
  return state;
}

const HISTORY_KEY = "pseudo-history";
const MODE_KEY = "pseudo-mode";

export function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save history:", e);
  }
}

export function loadHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      state.processingHistory = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load history:", e);
    state.processingHistory = [];
  }
}

export function clearHistoryStorage() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.warn("Failed to clear history:", e);
  }
}

export function saveMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch (e) {
    console.warn("Failed to save mode:", e);
  }
}

export function loadMode() {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === "XA" || saved === "XB") {
      state.currentMode = saved;
    }
  } catch (e) {
    console.warn("Failed to load mode:", e);
  }
}
