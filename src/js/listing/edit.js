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

  const form = event.target;
  const [titleElement, descriptionElement, tagsElement, endsAtElement] = form.elements;

  let mediaArr = [];
  const mediaGallery = form.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((input) => {
    if (input.value.trim() !== "") {
      mediaArr.push({ url: input.value, alt: titleElement.value });
    }
  });

  const tagsArr = tagsElement.value
    .replace(/\s+/g, "")
    .split(",")
    .filter((tag) => tag !== "");

  sendListing("PUT", id, titleElement.value, descriptionElement.value, tagsArr, new Date(endsAtElement.value), mediaArr)
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      console.error("Error updating listing:", error);
    });
};
