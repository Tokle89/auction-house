import * as storage from "../storage/index.js";

export const createProfileBtnImg = () => {
  const user = storage.get("user");
  const img = document.getElementById("profile-btn-img");

  const { name, avatar } = user;
  img.src = "../../../images/profile.jpg";
  if (avatar) {
    img.src = avatar;
    img.alt = name;
  }
};
