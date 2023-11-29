import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { renderCards } from "./render/render.js";
import { renderCarousel } from "./render/render.js";
import * as url from "./api/constant.js";
import { handleRegister } from "./auth/register.js";
import { displayRegisteredMsg } from "./components/userMsgs.js";
import { handleLogin } from "./auth/login.js";
import { loginCredentials } from "./auth/login.js";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

export const router = () => {
  const href = location.href;

  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else if (href.includes("login")) {
    displayRegisteredMsg();
    loginForm.addEventListener("submit", handleLogin);
    loginCredentials();
  } else if (href.includes("profile")) {
    console.log("profile");
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
  }
};

router();

const authBtns = document.getElementById("auth-btns");

authBtns.classList.add("d-none");
