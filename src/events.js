import { $, escapeHtml, hideModal, showModal, showToast } from "./dom.js";
import { setLang, t } from "./i18n.js";
import { processText } from "./processor.js";
import { clearHistoryStorage, loadCharLib, saveHistory, saveMode, saveSession, state } from "./state.js";
import { syncUrlParams } from "./url-params.js";

function renderLibraryModal() {
  loadCharLib().then(lib => {
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
    syncUrlParams();
  };
  for (const radio of modeRadios) radio.addEventListener('change', updateMode);
  modeRadios.forEach(radio => {
    if (radio.value === state.currentMode) {
      radio.checked = true;
    }
  });
  updateMode();

  $("menu-btn")?.addEventListener("click", () => {
    const menu = $("mobile-menu");
    const menuBtn = $("menu-btn");
    const iconSpan = menuBtn?.querySelector("span.material-icons") || menuBtn?.querySelector("md-icon");
    const isShown = menu?.classList.toggle("show");
    if (iconSpan) {
      iconSpan.textContent = isShown ? "close" : "menu";
    }
  });

  document.addEventListener("click", (e) => {
    const menu = $("mobile-menu");
    const menuBtn = $("menu-btn");
    const iconSpan = menuBtn?.querySelector("span.material-icons") || menuBtn?.querySelector("md-icon");
    if (menu?.classList.contains("show") &&
      !menu.contains(e.target) &&
      !menuBtn?.contains(e.target)) {
      menu.classList.remove("show");
      if (iconSpan) {
        iconSpan.textContent = "menu";
      }
    }
  });

  const upper = $("upper");
  const lower = $("lower");
  upper?.addEventListener('change', () => {
    if (upper.selected) lower.selected = false;
    updateOptionVisibility();
    syncUrlParams();
  });
  lower?.addEventListener('change', () => {
    if (lower.selected) upper.selected = false;
    updateOptionVisibility();
    syncUrlParams();
  });

  $("suffix-select")?.addEventListener("change", () => {
    updateOptionVisibility();
    syncUrlParams();
  });
  $("dbvowel")?.addEventListener("change", () => {
    updateOptionVisibility();
    syncUrlParams();
  });
  $("addHash")?.addEventListener("change", () => {
    updateOptionVisibility();
    syncUrlParams();
  });

  // Sync URL when any More Settings input changes
  ["custom-prefix", "custom-suffix", "custom-repeat", "custom-repeat-count",
   "dbvowel-count", "hash-length", "numcir", "preserveEsc"].forEach(id => {
    const el = $(id);
    const eventType = el?.tagName === "MD-SWITCH" ? "change" : "input";
    el?.addEventListener(eventType, syncUrlParams);
  });

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
      syncUrlParams();
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
    syncUrlParams();
  });

  $("input-text")?.addEventListener("input", syncUrlParams);

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

  $("library-btn-top")?.addEventListener("click", () => renderLibraryModal());

  $("about-btn")?.addEventListener("click", () => showModal("about-modal"));

  $("library-btn-mobile")?.addEventListener("click", () => {
    $("mobile-menu")?.classList.remove("show");
    renderLibraryModal();
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

  $("home-btn")?.addEventListener("click", () => {
    window.open("https://suntrise.github.io", "_blank");
  });

  $("home-btn-mobile")?.addEventListener("click", () => {
    window.open("https://suntrise.github.io", "_blank");
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
