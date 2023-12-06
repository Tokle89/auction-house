import { createElement } from "./createElement.js";

const mediaInputContainer = document.getElementById("media-input-container");

export const renderMediaInput = () => {
  const input = createElement(
    "input",
    ["form-control", "mb-2"],
    null,
    null,
    null,
    null,
    null,
    null,
  );

  input.type = "url";
  input.name = "media";
  input.id = "media";
  input.placeholder = "Media";

  mediaInputContainer.append(input);
};
