import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { renderCards } from "./render/render.js";
import { renderCarousel } from "./render/render.js";

import * as url from "./api/constant.js";

import { handleRegister } from "./auth/register.js";

const registerForm = document.getElementById("register-form");

export const router = () => {
  const href = location.href;
  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else if (href.includes("login")) {
    console.log("login");
    displayRegisteredMsg();
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
  }
};

const loginParagraph = document.getElementById("login-paragraph");

export const displayRegisteredMsg = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isRegistered = urlParams.get("registration");

  if (isRegistered) {
    loginParagraph.innerText =
      "You have successfully registered. Please login to continue.";
    loginParagraph.classList.add("text-secondary");
  }
};

router();
