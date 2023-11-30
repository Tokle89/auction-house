import { createProfileBtnImg } from "../components/profile.js";
const authBtns = document.getElementById("auth-btns");
const profileBtn = document.querySelector(".profile-btn");

export const toggleHeaderBtns = () => {
  const token = localStorage.getItem("token");

  if (token) {
    authBtns.classList.add("d-none");
    profileBtn.classList.remove("d-none");
    createProfileBtnImg();
  } else {
    authBtns.classList.remove("d-none");
    profileBtn.classList.add("d-none");
  }
};
