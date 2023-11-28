import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { renderCards } from "./render/render.js";
import { renderCarousel } from "./render/render.js";

import * as url from "./api/constant.js";

// renderCards(url.BASE + url.LISTINGS + url.listingsParams);
// renderCarousel(url.BASE + url.LISTINGS + url.listingsParams);

import { handleRegister } from "./auth/register.js";

const registerForm = document.getElementById("register-form");

export const router = () => {
  const href = location.href;
  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
  }
};

router();
