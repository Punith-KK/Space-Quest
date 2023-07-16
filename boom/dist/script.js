const earth = document.querySelectorAll(".earth path"),
land = document.querySelectorAll(".land path"),
water = document.querySelectorAll(".water path"),
feTurb = document.querySelector('#feturbulence'),
boomL = document.querySelectorAll('#boomlines path'),
boomG = document.querySelectorAll('#booms g');

//sounds
const audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/bomby2.mp3');

const start = document.getElementById('start');

start.addEventListener('click', function () {
  setTimeout(function () {audio.play();}, 600);
  master.restart();
  TweenMax.to(start, 0.3, {
    autoAlpha: 0 });

}, false);

TweenMax.set("#booms, #boomlines", {
  visibility: 'visible' });


TweenMax.set("#booms g", {
  transformOrigin: "50% 50%" });


function sceneOne() {
  const tl = new TimelineMax();

  tl.add("start");
  tl.staggerFromTo("#boomlines path", 0.5, {
    drawSVG: "0%" },
  {
    drawSVG: "100%" },
  0.3, "start");
  tl.staggerTo("#boomlines path", 0.4, {
    drawSVG: "0%" },
  0.3, "start+=0.5");
  tl.staggerFromTo("#booms g", 1, {
    scale: 0,
    opacity: 0 },
  {
    scale: 1,
    opacity: 1 },
  0.1, "start");
  tl.staggerTo("#booms g", 1, {
    scale: 2,
    opacity: 0 },
  0.1, "start+=0.5");
  tl.staggerTo(water, 0.5, {
    cycle: {
      scale: [0.8, 0.6, 0.3, 0.5, 0.1] },

    transformOrigin: "50% 50%",
    ease: Bounce.easeIn },
  0.001, "start+=2.5");
  tl.staggerTo(water, 1, {
    scale: 1,
    transformOrigin: "50% 50%",
    ease: Bounce.easeOut },
  0.001, "start+=3");

  return tl;
}

function sceneTwo() {
  const tl = new TimelineMax();

  tl.call(addAttr);
  tl.fromTo(feTurb, 1, {
    attr: {
      baseFrequency: '0 0' } },

  {
    attr: {
      baseFrequency: '0.8 1.2' },

    ease: Sine.easeOut });

  tl.to(feTurb, 1, {
    attr: {
      baseFrequency: '0 0' },

    ease: Sine.easeIn });

  tl.call(removeAttr);
  tl.add("boom");
  tl.to(".earthbk", 0.3, {
    opacity: 0,
    ease: Circ.easeIn },
  "boom");
  tl.staggerTo(land, 3, {
    cycle: {
      y: [700, -700, -1000, 1000],
      x: [200, -200, -700, 700],
      rotation: function (i) {
        return i * 20;
      } },

    opacity: 0,
    ease: Circ.easeInOut },
  0.001, "boom");
  tl.staggerTo(water, 3, {
    cycle: {
      y: [-700, 700],
      x: [700, -700],
      rotation: function (i) {
        return i * 20;
      } },

    opacity: 0,
    ease: Circ.easeInOut },
  0.001, "boom");

  return tl;
}

const master = new TimelineMax({ paused: true });
master.add(sceneOne());
master.add(sceneTwo(), "-=0.3");

// filter attribute helpers
function addAttr() {
  feTurb.setAttribute('baseFrequency', '0 0');
}

function removeAttr() {
  var applyFilter = document.getElementById("applyFilter");
  applyFilter.removeAttribute("filter");
}