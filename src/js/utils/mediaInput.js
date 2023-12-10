import { createElement } from "./createElement.js";

export const renderMediaInput = (className) => {
  const mediaInputContainer = document.getElementById(className);
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
