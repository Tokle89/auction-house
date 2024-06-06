import { createElement } from "./createElement.js";

/**
 *  Takes a date string and displays a countdown timer.
 * The timer is updated every second, and when the timer reaches 0, a message is displayed.
 * @param {string} date
 * @example
 * //Example usage:
 * countDown(2022/01/01);
 *
 *
 */
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

/**
 * Updates the countdown timer with the given values from countDown().
 * @param {number} days
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @example
 * //Example usage:
 * updateTime(12, 23, 10, 43);
 */
const updateTime = (days, hours, minutes, seconds) => {
  const dayContainer = document.querySelector(".days-container") || {};
  const hourContainer = document.querySelector(".hours-container") || {};
  const minuteContainer = document.querySelector(".min-container") || {};
  const secondContainer = document.querySelector(".sec-container") || {};

  dayContainer.innerText = days;
  hourContainer.innerText = hours;
  minuteContainer.innerText = minutes;
  secondContainer.innerText = seconds;
};

/**
 * Displays a message when the auction is over.
 * @example
 * //Example usage:
 * displayMsg();
 */
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

/**
 * Adjusts the content when the auction is over.
 * @example
 * //Example usage:
 * adjustContent();
 */
const adjustContent = () => {
  const infoContainer = document.querySelector(".info-container");
  const div = infoContainer.querySelector("div");
  const form = infoContainer.querySelector("form");
  div.classList.add("d-none");
  form.classList.add("d-none");
};
