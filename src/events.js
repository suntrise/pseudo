import { processText } from "./processor.js";
import { state, saveHistory, clearHistoryStorage, saveMode, saveSession } from "./state.js";
import { setLang, t } from "./i18n.js";
import { $, escapeHtml, showToast, showModal, hideModal } from "./dom.js";

export async function loadCharLib() {
  if (!state.charLib) {
    const basePath = window.BASE_PATH || './';
    state.charLib = await (await fetch(`${basePath}data/character.json`)).json();
  }
  return state.charLib;
}

export function updateOptionVisibility() {
  const suffix = $("suffix-select")?.value;
  const dbvowel = $("dbvowel")?.selected;
  const addHash = $("addHash")?.selected;

  $("custom-suffix-options").style.display = suffix === "4" ? "block" : "none";
  $("dbvowel-options").style.display = dbvowel ? "block" : "none";
  $("hash-options").style.display = addHash ? "block" : "none";
}

export function initEvents() {
  const modeRadios = document.querySelectorAll('md-radio[name="mode"]');
  const updateMode = () => {
    modeRadios.forEach(radio => {
      if (radio.checked) {
        state.currentMode = radio.value;
        saveMode(radio.value);
      }
    });
  };
  for (const radio of modeRadios) radio.addEventListener('change', updateMode);
  modeRadios.forEach(radio => {
    if (radio.value === state.currentMode) {
      radio.checked = true;
    }
  });
  updateMode();

  $("menu-btn")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    const menu = $("mobile-menu");
    const btn = $("menu-btn");
    if (menu?.classList.contains("show") &&
      !menu.contains(e.target) &&
      !btn?.contains(e.target)) {
      menu.classList.remove("show");
    }
  });

  const upper = $("upper");
  const lower = $("lower");
  upper?.addEventListener('change', () => {
    if (upper.selected) lower.selected = false;
    updateOptionVisibility();
  });
  lower?.addEventListener('change', () => {
    if (lower.selected) upper.selected = false;
    updateOptionVisibility();
  });

  $("suffix-select")?.addEventListener("change", updateOptionVisibility);
  $("dbvowel")?.addEventListener("change", updateOptionVisibility);
  $("addHash")?.addEventListener("change", updateOptionVisibility);

  $("process-btn")?.addEventListener("click", async () => {
    const text = $("input-text")?.value || "";
    const options = {
      mode: state.currentMode,
      upper: $("upper")?.selected,
      lower: $("lower")?.selected,
      suffix: $("suffix-select")?.value || "0",
      customPrefix: $("custom-prefix")?.value || "",
      customSuffix: $("custom-suffix")?.value || "",
      customRepeat: $("custom-repeat")?.value || "",
      customRepeatCount: parseInt($("custom-repeat-count")?.value, 10) || 7,
      dbvowel: $("dbvowel")?.selected,
      dbvowelCount: parseInt($("dbvowel-count")?.value, 10) || 1,
      numcir: $("numcir")?.selected,
      addHash: $("addHash")?.selected,
      hashLength: parseInt($("hash-length")?.value, 10) || 6,
      preserveEsc: $("preserveEsc")?.selected
    };
    try {
      const result = await processText(text, options);
      $("output-text").value = result;
      saveSession(text, result);
      if (text.trim()) {
        state.processingHistory.unshift({
          timestamp: Date.now(),
          input: text,
          output: result
        });
        saveHistory(state.processingHistory);
      }
    } catch (e) {
      $("output-text").value = `Error: ${e.message}`;
    }
  });

  $("clear-btn")?.addEventListener("click", () => {
    $("input-text").value = "";
    $("output-text").value = "";
  });

  $("copy-btn")?.addEventListener("click", async () => {
    const val = $("output-text")?.value;
    if (val) {
      await navigator.clipboard.writeText(val);
      showToast(t().copySuccess || "Copied!");
    }
  });

  $("history-btn")?.addEventListener("click", () => {
    const content = $("history-content");
    const txt = t();
    const locale = state.currentLang === "zh-Hans" ? "zh-CN" : state.currentLang === "zh-Hant" ? "zh-TW" : "en-US";
    if (state.processingHistory.length === 0) {
      content.innerHTML = `<p>${txt.historyEmpty}</p>`;
    } else {
      content.innerHTML = state.processingHistory.map((item, i) => `
        <div class="history-item">
          <div class="history-timestamp">${i + 1}. ${new Date(item.timestamp).toLocaleString(locale)}</div>
          <div class="history-text">
            <div class="history-row"><span class="history-label">${txt.historyInput}</span> <span class="history-input">${escapeHtml(item.input)}</span></div>
            <div class="history-row"><span class="history-label">${txt.historyOutput}</span> <span class="history-output">${escapeHtml(item.output)}</span></div>
          </div>
        </div>
      `).join('');
    }
    showModal("history-modal");
  });

  $("clear-history-btn")?.addEventListener("click", () => {
    state.processingHistory = [];
    clearHistoryStorage();
    $("history-content").innerHTML = `<p>${t().historyCleared}</p>`;
  });

  $("library-btn-top")?.addEventListener("click", async () => {
    const lib = await loadCharLib();
    const txt = t();
    let html = '<table class="library-table"><thead><tr>';
    html += `<th>${txt.libraryCharacter}</th><th>${txt.libraryVariants}</th><th>${txt.libraryCount}</th></tr></thead><tbody>`;

    for (const [char, variants] of Object.entries(lib)) {
      if (Array.isArray(variants)) {
        html += `<tr><td><strong>${escapeHtml(char)}</strong></td><td class="library-variants">${escapeHtml(variants.join(' '))}</td><td>${variants.length}</td></tr>`;
      }
    }
    html += `</tbody></table><p class="library-total">${txt.libraryTotal.replace('{count}', Object.keys(lib).length)}</p>`;

    $("library-content").innerHTML = html;
    showModal("library-modal");
  });

  $("about-btn")?.addEventListener("click", () => showModal("about-modal"));

  $("library-btn-mobile")?.addEventListener("click", async () => {
    $("mobile-menu")?.classList.remove("show");
    const lib = await loadCharLib();
    const txt = t();
    let html = '<table class="library-table"><thead><tr>';
    html += `<th>${txt.libraryCharacter}</th><th>${txt.libraryVariants}</th><th>${txt.libraryCount}</th></tr></thead><tbody>`;
    for (const [char, variants] of Object.entries(lib)) {
      if (Array.isArray(variants)) {
        html += `<tr><td><strong>${escapeHtml(char)}</strong></td><td class="library-variants">${escapeHtml(variants.join(' '))}</td><td>${variants.length}</td></tr>`;
      }
    }
    html += `</tbody></table><p class="library-total">${txt.libraryTotal.replace('{count}', Object.keys(lib).length)}</p>`;
    $("library-content").innerHTML = html;
    showModal("library-modal");
  });

  $("about-btn-mobile")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.remove("show");
    showModal("about-modal");
  });

  $("lang-btn-mobile")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.remove("show");
    showModal("lang-modal");
  });

  $("github-btn-mobile")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.remove("show");
    window.open("https://github.com/suntrise/pseudo", "_blank");
  });

  $("exe-btn")?.addEventListener("click", () => {
    window.open("https://github.com/suntrise/Pseudo-localization-Demo", "_blank");
  });

  $("exe-btn-mobile")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.remove("show");
    window.open("https://github.com/suntrise/Pseudo-localization-Demo", "_blank");
  });

  $("lang-btn")?.addEventListener("click", () => showModal("lang-modal"));

  $("lang-list")?.addEventListener("click", (e) => {
    const langOption = e.target.closest(".lang-option");
    if (langOption) {
      const selectedLang = langOption.dataset.lang;
      if (selectedLang && selectedLang !== state.currentLang) {
        setLang(selectedLang);
        hideModal("lang-modal");
      }
    }
  });

  $("lang-list")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const langOption = e.target.closest(".lang-option");
      if (langOption) {
        e.preventDefault();
        const selectedLang = langOption.dataset.lang;
        if (selectedLang && selectedLang !== state.currentLang) {
          setLang(selectedLang);
          hideModal("lang-modal");
        }
      }
    }
  });

  const modalEvents = [
    ["close-history-btn", "history-modal"],
    ["history-backdrop", "history-modal"],
    ["close-library-btn", "library-modal"],
    ["library-backdrop", "library-modal"],
    ["close-about-btn", "about-modal"],
    ["about-backdrop", "about-modal"],
    ["close-lang-btn", "lang-modal"],
    ["lang-backdrop", "lang-modal"]
  ];
  modalEvents.forEach(([btnId, modalId]) => {
    $(btnId)?.addEventListener("click", () => hideModal(modalId));
  });
}
