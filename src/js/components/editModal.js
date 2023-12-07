import { createElement } from "../utils/createElement.js";

export const createEditModalContent = ({
  title,
  description,
  tags,
  media,
  endsAt,
}) => {
  const titleInput = document.getElementById("edit-title");
  titleInput.value = title;
  const descriptionInput = document.getElementById("edit-description");
  descriptionInput.value = description;
  const tagsInput = document.getElementById("edit-tags");
  const tagsString = tags.join(", ");
  tagsInput.value = tagsString;
  const endsAtInput = document.getElementById("edit-date-picker");
  endsAtInput.value = endsAt;
  const mediaInputContainer = document.getElementById(
    "edit-media-input-container",
  );
  media.forEach((media, i) => {
    if (i === 0) {
      const mediaInput = document.getElementById("edit-media");
      mediaInput.value = media;
    } else if (i > 0) {
      const input = createElement(
        "input",
        ["form-control"],
        null,
        null,
        null,
        null,
        null,
        null,
      );
      input.type = "url";
      input.name = "media";
      input.id = "edit-media";
      input.placeholder = "Media";
      input.value = media;
      mediaInputContainer.append(input);
    }
  });

  const formBtn = document.getElementById("edit-form-btn");
  formBtn.innerText = "Edit";
};
