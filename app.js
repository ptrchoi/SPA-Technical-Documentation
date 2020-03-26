/*  
    FreeCodeCamp Responsive Web Design Project: 
    >TECHNICAL DOCUMENTATION PAGE<

    > PURE/VANILLA JAVASCRIPT
    > ACTIVE MENU ITEM FROM SCROLLING PAGE
*/

//Initialize variables/flags
var flags = {
  overlayOn: false
};

/* ==================== NAV MENU OVERLAY FUNCTIONS ====================== */
/* Nav menu switches to overlay column view on smaller screens,
    no overlay and row view on wider screens.
    Icon swaps between hamburger or 'x' when overlay is off/on. */
function checkOverlay() {
  if (flags.overlayOn) {
    toggleOverlay();
  }
}

function toggleOverlay() {
  toggleOverlayDisplay();
  showOverlayLinks(flags.overlayOn);
}

function toggleOverlayDisplay() {
  //Toggle menu overlay between off/on & menu icon between burger/x
  document.getElementById("nav-overlay").classList.toggle("nav-overlay--on");
  document.getElementById("nav-icon").classList.toggle("nav-icon--x");

  if (flags.overlayOn) {
    flags.overlayOn = false;
  } else {
    flags.overlayOn = true;
  }
}

function showOverlayLinks(showLinks) {
  var nav = document.getElementById("navbar");

  /* Note that assigning 'display' property to DOM in script overrides CSS media query assignments. */
  if (showLinks) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}

/* ---------- WINDOW RESIZE HANDLER FOR OVERLAY ------------ */
/* Need to test for viewport resizing while nav overlay is open. */
if (matchMedia) {
  const mq = window.matchMedia("(min-width: 599px)");
  mq.addListener(windowResized);
  windowResized(mq);
}

function windowResized(mq) {
  //If nav overlay is on and viewport is stretched past breakpoint, toggle overlay off.
  showOverlayLinks(mq.matches);

  if (mq.matches && flags.overlayOn) {
    toggleOverlayDisplay();
  }
}

/* ---------- WINDOW SCROLL HANDLER FOR NAV MENU HIGHLIGHT ------------ */
window.onscroll = function() {
  updateActiveMenuItem();
};

function getTopOffset(el) {
  const box = el.getBoundingClientRect();
  return box.top + window.scrollY;
}

function updateActiveMenuItem() {
  //ADD header height to scrollPos
  var scrollPos = window.scrollY + 120;
  var pageSections = document.getElementsByClassName("main-section");
  var menuItems = document.getElementsByClassName("nav-link");
  var activeMenuItem = document.getElementsByClassName("active-link");

  if (activeMenuItem[0]) {
    activeMenuItem[0].classList.remove("active-link");
  }

  for (var i = 0; i < pageSections.length; i++) {
    if (i === 0 && scrollPos < 200) {
      //Check for 1st item/gap
      menuItems[0].classList.add("active-link");
    } else if (
      i === pageSections.length - 1 &&
      getTopOffset(pageSections[i]) < scrollPos
    ) {
      //Check for last item
      menuItems[i].classList.add("active-link");
    } else if (
      getTopOffset(pageSections[i]) < scrollPos &&
      getTopOffset(pageSections[i + 1]) > scrollPos
    ) {
      //Else check topOffset of current & next sections
      menuItems[i].classList.add("active-link");
    }
  }
}
