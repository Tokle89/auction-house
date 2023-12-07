import { createElement } from "./createElement.js";

export const countDown = (date) => {
  const countdownInterval = setInterval(() => {
    const countdownDate = new Date(date).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      displayMsg();
      adjustContent();
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateTime(days, hours, minutes, seconds);
  }, 1000);
};

const updateTime = (days, hours, minutes, seconds) => {
  const dayContainer = document.querySelector(".days-container");
  const hourContainer = document.querySelector(".hours-container");
  const minuteContainer = document.querySelector(".min-container");
  const secondContainer = document.querySelector(".sec-container");

  dayContainer.innerText = days;
  hourContainer.innerText = hours;
  minuteContainer.innerText = minutes;
  secondContainer.innerText = seconds;
};

const displayMsg = () => {
  const container = document.querySelector(".time-remaining-container");
  container.innerHTML = "";
  const h2 = createElement(
    "h2",
    ["fw-bold", "mb-3", "fs-1", "text-secondary"],
    undefined,
    "Auction Ended",
  );
  container.append(h2);
};

const adjustContent = () => {
  const infoContainer = document.querySelector(".info-container");
  const div = infoContainer.querySelector("div");
  const form = infoContainer.querySelector("form");
  div.classList.add("d-none");
  form.classList.add("d-none");
};
