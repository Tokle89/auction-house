import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import {
  renderCards,
  renderCarousel,
  renderListing,
  renderProfile,
  renderProfileListings,
} from "./render/render.js";
import * as url from "./api/constant.js";
import { handleRegister } from "./auth/register.js";
import { displayRegisteredMsg } from "./components/userMsgs.js";
import { handleLogin, loginCredentials } from "./auth/login.js";
import { toggleHeaderBtns } from "./utils/toggle.js";
import { handleLogout } from "./auth/logout.js";
import { getQueryParamId } from "./utils/queryParam.js";
import * as storage from "./storage/index.js";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const listingBtn = document.getElementById("listing-btn");
const listingBidsBtn = document.getElementById("listing-bids-btn");
const listingWinsBtn = document.getElementById("listing-wins-btn");

export const router = () => {
  const href = location.href;

  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else if (href.includes("login")) {
    displayRegisteredMsg();
    loginForm.addEventListener("submit", handleLogin);
    loginCredentials();
  } else if (href.includes("profile")) {
    let id = getQueryParamId();
    if (!id) {
      id = storage.get("user").name;
    }
    renderProfile(url.BASE + url.PROFILE + `/${id}` + url.profileParams);
    renderProfileListings("listings");

    listingBtn.addEventListener("click", () => {
      let id = listingBtn.id;
      renderProfileListings("listings");
      toggleFeedBtnClass(id);
    });

    listingBidsBtn.addEventListener("click", () => {
      let id = listingBidsBtn.id;
      renderProfileListings("bids");
      toggleFeedBtnClass(id);
    });

    listingWinsBtn.addEventListener("click", () => {
      let id = listingWinsBtn.id;
      renderProfileListings("wins");
      toggleFeedBtnClass(id);
    });
  } else if (href.includes("listing")) {
    const id = getQueryParamId();
    renderListing(url.BASE + url.LISTINGS + `/${id}` + url.listingsParams);
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
  }
};

router();

toggleHeaderBtns();

logoutBtn.addEventListener("click", handleLogout);

export const toggleFeedBtnClass = (id) => {
  const btnContainer = document.querySelector(".btn-group");
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("current-btn");
    } else {
      btn.classList.remove("current-btn");
    }
  });
};
