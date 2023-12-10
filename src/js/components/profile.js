import * as storage from "../storage/index.js";
import { createElement } from "../utils/createElement.js";
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

export const createProfile = ({ name, email, _count, credits, avatar }) => {
  const element = createElement("div", [
    "profile-info",
    "container",
    "d-flex",
    "align-items-center",
    "justify-content-center",
  ]);
  const img = createElement(
    "img",
    ["profile-avatar", "rounded-circle"],
    undefined,
    undefined,
    undefined,
    avatar,
    name,
  );
  const h1 = createElement(
    "h1",
    ["fs-4", "fw-bold", "mb-0", "text-capitalize"],
    undefined,
    name,
  );
  const p = createElement("p", ["text-dark"], undefined, email);
  const secondP = createElement(
    "p",
    ["fw-bold", "text-secondary", "mb-0"],
    undefined,
    `Listings: ${_count.listings}`,
  );
  const div = createElement("div", ["ps-4"], [h1, p, secondP]);
  element.append(img, div);

  console.log(_count.listings);

  if (name === storage.get("user").name) {
    secondP.innerText = `Credits: ${credits}`;
  }

  return element;
};
