const menuLinks = document.querySelectorAll(".navbar__link[data-goto]");

function hideMenu() {
  const navbarWrapper = document.querySelector(".navbar__wrapper");

  if (navbarWrapper && navbarWrapper.classList.contains("burger-active")) {
    navbarWrapper.classList.remove("burger-active");
    document.body.classList.remove("_lock");
  }
}

function onMenuLinkClick(e) {
  const menuLink = e.target;

  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const targetBlock = document.querySelector(menuLink.dataset.goto);
    const targetBlockScrollValue =
      targetBlock.getBoundingClientRect().top +
      scrollY -
      document.querySelector("header").offsetHeight;

    window.scrollTo({
      top: targetBlockScrollValue,
      behavior: "smooth",
    });
    e.preventDefault();
    hideMenu();
    e.target.blur();
  }
}

if (menuLinks.length) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}
