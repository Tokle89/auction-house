export const countDown = (date) => {
  const countdownInterval = setInterval(() => {
    const countdownDate = new Date(date).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      console.log("Countdown finished!");
      return;
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
