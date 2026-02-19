export const state = {
  i18nData: {},
  metadata: {},
  currentLang: "en",
  currentMode: "XA",
  processingHistory: [],
  charLib: null,
  supportedLanguages: []
};

const HISTORY_KEY = "pseudo-history";
const MODE_KEY = "pseudo-mode";
const SESSION_INPUT_KEY = "pseudo-session-input";
const SESSION_OUTPUT_KEY = "pseudo-session-output";

const hasCompression = typeof CompressionStream === "function";

async function compress(data) {
  const json = JSON.stringify(data);
  if (!hasCompression) return json;
  const input = new TextEncoder().encode(json);
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(input);
  writer.close();
  const buffer = await new Response(cs.readable).arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

async function decompress(encoded) {
  try {
    const binary = atob(encoded);
    const input = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(input);
    writer.close();
    return new Response(ds.readable).text();
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

export async function saveHistory(history) {
  try {
    const compressed = await compress(history);
    localStorage.setItem(HISTORY_KEY, compressed);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      localStorage.removeItem(HISTORY_KEY);
      try {
        localStorage.setItem(HISTORY_KEY, await compress(history));
      } catch {
        console.warn("LocalStorage full, skipping save");
      }
    } else {
      console.warn("Failed to save history:", e);
    }
  }
}

export async function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      state.processingHistory = [];
      return;
    }

    const data = await decompress(raw);
    if (Array.isArray(data)) {
      state.processingHistory = data;
      return;
    }

    try {
      const legacyData = JSON.parse(raw);
      if (Array.isArray(legacyData)) {
        state.processingHistory = legacyData;
        await saveHistory(legacyData);
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
