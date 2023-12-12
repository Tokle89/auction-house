import { sendListing } from "./index.js";

/**
 *  handles the edit listing form, and sends the form data to the sendListing function.
 * verifies the media input, and sends null if the input is empty.
 * @param {Number} id
 * @example
 * //Example usage:
 * handleEditListing(id);
 *
 */
export const handleEditListing = (id) => {
  event.preventDefault();

  const [title, description, tags, endsAt] = event.target.elements;

  let mediaArr = [];

  const form = document.getElementById("edit-listing-form");
  const mediaGallery = form.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((input) => {
    if (input.value !== "") {
      mediaArr.push(input.value);
    } else {
      input.disabled = true;
    }
  });

  if (mediaArr.length === 0) {
    mediaArr = null;
  }

  const tagsArr = tags.value.replace(/\s+/g, "").split(",");

  sendListing(
    "PUT",
    id,
    title,
    description,
    tagsArr,
    new Date(endsAt.value),
    mediaArr,
  );
};
