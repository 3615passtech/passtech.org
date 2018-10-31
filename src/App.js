// Material Design elements
import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";

// Glitch on scroll effect
import Splitting from "splitting";

// Animated gradient effect
import Granim from "granim";

new Granim({
  element: "#granim-canvas",
  name: "basic-gradient",
  direction: "left-right",
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        ["#81e5c9", "#b4fffc"],
        ["#4db298", "#81e5c9"],
        ["#4db298", "#b4fffc"]
      ],
      transitionSpeed: 2000
    }
  }
});

// Glitch on scroll effect
const h3 = Splitting({
  target: document.querySelectorAll("h3"),
  by: "chars"
});

const h = (p, v) => {
  return Math.random() < p ? Math.random() : v;
};

let G_lock = false, G_clrd = true;

const gltch = () => h3.forEach(title => {
  G_clrd = false;
  title.chars.forEach(c => {
    c.style.color = "rgba(0,0,0," + h(0.6, 1) + ")";
    c.style.background = "rgba(0,0,0," + h(0.02, 0) + ")";
  });
});

const ungltch = () => {
  if (G_clrd) return; G_clrd = true;
  h3.forEach(title => {
    title.chars.forEach(c => {
      c.style.color = "";
      c.style.background = "";
    });
  });
};

const clr = () => setTimeout(() => G_lock ? clr() : ungltch(), 500);

const onScroll = () => {
  if (G_lock) return; G_lock = true;
  gltch(); clr();
  setTimeout(() => {
    G_lock = false;
  }, 150);
};

// Uses Passive Event Listeners to Improve Scrolling Performance https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners
document.addEventListener('wheel', onScroll, { passive: true });

// Material Design elements
new MDCRipple(document.querySelector(".mdc-button"));
new MDCTextField(document.querySelector(".mdc-text-field"));
