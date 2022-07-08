const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function onPageLoadDeviceDetect() {
  if (isMobile.any()) {
    document.body.classList.add("_touch");
  } else {
    document.body.classList.add("_pc");
  }

  if (window.screen.width < 768) {
    document.body.classList.add("_small");
  } else {
    document.body.classList.add("_large");
  }
}

function onResize() {
  if (isMobile.any()) {
    document.body.classList.add("_touch");
    document.body.classList.remove("_pc");
  } else if (!isMobile.any()) {
    document.body.classList.add("_pc");
    document.body.classList.remove("_touch");
  }

  if (window.innerWidth < 768) {
    document.body.classList.add("_small");
    document.body.classList.remove("_large");
  } else if (window.innerWidth >= 768) {
    document.body.classList.add("_large");
    document.body.classList.remove("_small");
  }

  const navbarWrapper = document.querySelector(".navbar__wrapper");
  if (window.innerWidth > 991) {
    if (navbarWrapper.classList.contains("burger-active")) {
      navbarWrapper.classList.remove("burger-active");
      document.body.classList.remove("_lock");
    }
  }
}

onPageLoadDeviceDetect();
window.addEventListener("resize", onResize);
