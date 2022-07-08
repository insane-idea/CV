window.addEventListener('hashchange', () => {
  history.pushState('', document.title, window.location.pathname);
})
