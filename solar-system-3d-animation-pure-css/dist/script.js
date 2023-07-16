//For those who wonder why Javascript is here, a short explanation. This script only ensures that the initial position, the planetary position is calculated correctly by setting the seconds left since 1-1-2019 to a css custom variable. No hidden Magic 🤷

let timestamp_start = new Date("2019-01-01").getTime();
let timestamp_now = new Date().getTime();
let secondsLeft = (timestamp_now - timestamp_start) / 1000;
let root = document.documentElement;
root.style.setProperty('--seconds-left', `${secondsLeft}s`);