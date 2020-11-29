export function setLocal(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getLocal(name) {
  return JSON.parse(window.localStorage.getItem(name));
}
