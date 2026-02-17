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

export function showModal(id) {
  const modal = $(id);
  if (modal) {
    modal.classList.remove("hiding");
    modal.style.display = "";
    modal.classList.add("show");
  }
}

export function hideModal(id) {
  const modal = $(id);
  if (modal) {
    modal.classList.add("hiding");
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.remove("hiding");
      modal.style.display = "none";
    }, 250);
  }
}
