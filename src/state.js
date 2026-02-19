export const state = {
  i18nData: {},
  metadata: {},
  currentLang: "en",
  currentMode: "XA",
  processingHistory: [],
  charLib: null,
  supportedLanguages: []
};

export function getState() {
  return state;
}

const HISTORY_KEY = "pseudo-history";
const MODE_KEY = "pseudo-mode";
const SESSION_INPUT_KEY = "pseudo-session-input";
const SESSION_OUTPUT_KEY = "pseudo-session-output";

function compress(data) {
  return LZString.compressToUTF16(JSON.stringify(data));
}

function decompress(encoded) {
  try {
    const decoded = LZString.decompressFromUTF16(encoded);
    return decoded ? JSON.parse(decoded) : null;
  } catch {
    return null;
  }
}

export function saveSession(input, output) {
  try {
    sessionStorage.setItem(SESSION_INPUT_KEY, input);
    sessionStorage.setItem(SESSION_OUTPUT_KEY, output);
  } catch (e) {
    console.warn("Failed to save session:", e);
  }
}

export function loadSession() {
  try {
    return {
      input: sessionStorage.getItem(SESSION_INPUT_KEY) || "",
      output: sessionStorage.getItem(SESSION_OUTPUT_KEY) || ""
    };
  } catch (e) {
    console.warn("Failed to load session:", e);
    return { input: "", output: "" };
  }
}

export function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, compress(history));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      localStorage.removeItem(HISTORY_KEY);
      try {
        localStorage.setItem(HISTORY_KEY, compress(history));
      } catch {
        console.warn("LocalStorage full, skipping save");
      }
    } else {
      console.warn("Failed to save history:", e);
    }
  }
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      state.processingHistory = [];
      return;
    }

    const data = decompress(raw);
    if (Array.isArray(data)) {
      state.processingHistory = data;
      return;
    }

    try {
      const legacyData = JSON.parse(raw);
      if (Array.isArray(legacyData)) {
        state.processingHistory = legacyData;
        saveHistory(legacyData);
        return;
      }
    } catch {
      // Not valid JSON
    }
  } catch (e) {
    console.warn("Failed to load history:", e);
  }
  state.processingHistory = [];
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
