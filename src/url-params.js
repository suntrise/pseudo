import { $ } from "./dom.js";
import { updateOptionVisibility } from "./events.js";
import { processText } from "./processor.js";
import { saveSession, saveHistory, state } from "./state.js";

const DEFAULTS = {
  mode: "XA",
  suffix: "0",
  customPrefix: "[",
  customSuffix: "]",
  customRepeatCount: 7,
  dbvowelCount: 1,
  hashLength: 5,
  upper: false,
  lower: false,
  dbvowel: false,
  numcir: false,
  addHash: false,
  preserveEsc: false,
};

function parseBool(value) {
  return value?.toLowerCase() === "true";
}

function parseNumber(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);

  const letterRaw = params.get("letter");
  const letter = ["upper", "lower"].includes(letterRaw) ? letterRaw : "normal";

  return {
    text: params.get("text") || undefined,
    mode: params.get("mode") || DEFAULTS.mode,
    upper: letter === "upper",
    lower: letter === "lower",
    suffix: params.get("suffix") || DEFAULTS.suffix,
    customPrefix: params.get("customPrefix") ?? DEFAULTS.customPrefix,
    customSuffix: params.get("customSuffix") ?? DEFAULTS.customSuffix,
    customRepeat: params.get("customRepeat") || undefined,
    customRepeatCount: parseNumber(params.get("customRepeatCount"), DEFAULTS.customRepeatCount),
    dbvowel: parseBool(params.get("dbvowel")),
    dbvowelCount: parseNumber(params.get("dbvowelCount"), DEFAULTS.dbvowelCount),
    numcir: parseBool(params.get("numcir")),
    addHash: parseBool(params.get("addHash")),
    hashLength: parseNumber(params.get("hashLength"), DEFAULTS.hashLength),
    preserveEsc: parseBool(params.get("preserveEsc")),
  };
}

export function applyUrlConfigToUI(params) {
  const modeRadio = $(params.mode === "XB" ? "mode-xb" : "mode-xa");
  if (modeRadio) {
    modeRadio.checked = true;
  }

  const switches = ["upper", "lower", "dbvowel", "numcir", "addHash", "preserveEsc"];
  for (const id of switches) {
    const el = $(id);
    if (el) {
      el.selected = params[id] ?? DEFAULTS[id];
    }
  }

  if ($("suffix-select")) {
    $("suffix-select").value = params.suffix;
  }

  const textFields = {
    "custom-prefix": params.customPrefix,
    "custom-suffix": params.customSuffix,
    "custom-repeat": params.customRepeat ?? "",
    "custom-repeat-count": String(params.customRepeatCount),
    "dbvowel-count": String(params.dbvowelCount),
    "hash-length": String(params.hashLength),
  };

  for (const [id, value] of Object.entries(textFields)) {
    const el = $(id);
    if (el && value !== undefined) {
      el.value = value;
    }
  }

  updateOptionVisibility();
}

export async function applyUrlParamsToUI(params) {
  applyUrlConfigToUI(params);

  if (!params.text) return;

  $("input-text").value = params.text;

  const options = {
    mode: params.mode,
    upper: params.upper,
    lower: params.lower,
    suffix: params.suffix,
    customPrefix: params.customPrefix,
    customSuffix: params.customSuffix,
    customRepeat: params.customRepeat || "",
    customRepeatCount: params.customRepeatCount,
    dbvowel: params.dbvowel,
    dbvowelCount: params.dbvowelCount,
    numcir: params.numcir,
    addHash: params.addHash,
    hashLength: params.hashLength,
    preserveEsc: params.preserveEsc,
  };

  try {
    const result = await processText(params.text, options);
    $("output-text").value = result;
    saveSession(params.text, result);
    state.processingHistory.unshift({
      timestamp: Date.now(),
      input: params.text,
      output: result
    });
    saveHistory(state.processingHistory);
  } catch (e) {
    $("output-text").value = `Error: ${e.message}`;
  }
}

export function syncUrlParams() {
  const params = new URLSearchParams();

  const text = $("input-text")?.value || "";
  if (text) params.set("text", text);

  const mode = document.querySelector('md-radio[name="mode"]:checked')?.value || DEFAULTS.mode;
  if (mode !== DEFAULTS.mode) {
    params.set("mode", mode);
  }

  const upper = $("upper")?.selected ?? false;
  const lower = $("lower")?.selected ?? false;
  const letter = upper ? "upper" : lower ? "lower" : "normal";
  if (letter !== "normal") params.set("letter", letter);

  const suffix = $("suffix-select")?.value || DEFAULTS.suffix;
  if (suffix !== DEFAULTS.suffix) {
    params.set("suffix", suffix);
  }

  const customPrefix = $("custom-prefix")?.value ?? "";
  if (customPrefix !== DEFAULTS.customPrefix) {
    params.set("customPrefix", customPrefix);
  }

  const customSuffix = $("custom-suffix")?.value ?? "";
  if (customSuffix !== DEFAULTS.customSuffix) {
    params.set("customSuffix", customSuffix);
  }

  const customRepeat = $("custom-repeat")?.value || "";
  if (customRepeat) {
    params.set("customRepeat", customRepeat);
  }

  const customRepeatCount = parseInt($("custom-repeat-count")?.value, 10) || DEFAULTS.customRepeatCount;
  if (customRepeatCount !== DEFAULTS.customRepeatCount) {
    params.set("customRepeatCount", String(customRepeatCount));
  }

  const dbvowel = $("dbvowel")?.selected ?? false;
  if (dbvowel) params.set("dbvowel", "true");

  const dbvowelCount = parseInt($("dbvowel-count")?.value, 10) || DEFAULTS.dbvowelCount;
  if (dbvowelCount !== DEFAULTS.dbvowelCount) {
    params.set("dbvowelCount", String(dbvowelCount));
  }

  const numcir = $("numcir")?.selected ?? false;
  if (numcir) params.set("numcir", "true");

  const addHash = $("addHash")?.selected ?? false;
  if (addHash) params.set("addHash", "true");

  const hashLength = parseInt($("hash-length")?.value, 10) || DEFAULTS.hashLength;
  if (hashLength !== DEFAULTS.hashLength) {
    params.set("hashLength", String(hashLength));
  }

  const preserveEsc = $("preserveEsc")?.selected ?? false;
  if (preserveEsc) params.set("preserveEsc", "true");

  const url = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  history.replaceState(null, "", url);
}
