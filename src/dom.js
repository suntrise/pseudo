export const $ = (id) => document.getElementById(id);

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function showToast(message) {
  const toast = $("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
}

const closingModal = {};

export function showModal(id) {
  const modal = $(id);
  if (modal && !closingModal[id]) {
    modal.classList.remove("hiding");
    modal.style.display = "";
    modal.classList.add("show");
  }
}

export function hideModal(id) {
  const modal = $(id);
  const modalPanel = modal?.querySelector(".modal-panel");
  if (modal) {
    closingModal[id] = true;
    modal.classList.add("hiding");
    modal.classList.remove("show");
    if (modalPanel) {
      modalPanel.style.animation = "dialog-exit 0.2s cubic-bezier(0.2, 0, 0, 1) forwards";
    }
    setTimeout(() => {
      modal.classList.remove("hiding");
      modal.style.display = "none";
      if (modalPanel) {
        modalPanel.style.animation = "";
      }
      closingModal[id] = false;
    }, 250);
  }
}
