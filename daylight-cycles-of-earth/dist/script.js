let
  isHover = false,
  frame = 0;

const
  MAX_ANG = 23.4,
  MONTHS = ['December', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

const
  label = document.getElementById('label'),
  northLabel = document.getElementById('northLabel'),
  southLabel = document.getElementById('southLabel'),
  angleCss = document.createElement('style');
document.head.prepend(angleCss);

function setAngle(angValue) {
  let ang = easeAng(angValue);
  angleCss.innerText =
    `body {
      --ang: ${ang};
      --ang-full: ${angValue};
      --ang-z: ${10 - Math.floor((angValue) * 10)};
    }`;
  
  label.innerHTML =
    Math.abs(ang * MAX_ANG).toFixed(1) +
    '&deg<br/>' +
    MONTHS[Math.floor(((angValue * 12) + 0.7) % 12)];
  
  const hrs = Math.round(7 + (5 * (1 + ang)));
  northLabel.innerText = hrs + ' hrs';
  southLabel.innerText = (24 - hrs) + ' hrs';
}

function easeAng(angValue) {
  let eased = (angValue > 0.5 ? 1 - angValue : angValue) * 2;
  eased = -0.5 * (Math.cos(Math.PI * eased) - 1);
  return (2 * eased) - 1;
}

function hoverOrbit(e) {
  frame = 125 * (e.offsetX / e.target.offsetWidth);
}

setInterval(() => {
  if (!isHover) {
    frame += 1;
    frame %= 250;
  }
  setAngle(frame / 250);
}, 50);