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
