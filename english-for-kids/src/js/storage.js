function setLocal(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

function getLocal(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

export { setLocal, getLocal };
