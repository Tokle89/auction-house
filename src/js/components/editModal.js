import { createElement } from "../utils/createElement.js";

/**
 *
 * Takes the modal edit form, and  fils the form inputs with the given data.
 * @param {object} param0
 * @param {string} param0.title - The title of the listing.
 * @param {string} param0.description - The description of the listing.
 * @param {array} param0.tags - The tags of the listing.
 * @param {array} param0.media - The media of the listing.
 * @param {string} param0.endsAt - The end date of the listing.
 *
 * @example
 * //Example usage:
 * const element = createEditModalContent({ title, description, tags, media, endsAt });
 */
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
