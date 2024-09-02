import { sendListing } from "./index.js";

/**
 * handles the create listing form, and sends the form data to the sendListing function.
 * verifies the media input, and sends null if the input is empty.
 * @example
 * //Example usage:
 * handleSubmitListing();
 *
 */

export const handleSubmitListing = () => {
  event.preventDefault();
  const form = event.target;
  console.log("submitting listing");

  const [titleElement, descriptionElement, tagsElement, endsAtElement] = form.elements;

  let mediaArr = [];
  const mediaGallery = document.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((media) => {
    if (media.value.trim() !== "") {
      mediaArr.push({ url: media.value, alt: titleElement.value });
    }
  });

  const tagsArr = tagsElement.value
    .replace(/\s+/g, "")
    .split(",")
    .filter((tag) => tag !== "");

  sendListing("POST", null, titleElement.value, descriptionElement.value, tagsArr, new Date(endsAtElement.value), mediaArr)
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      console.error("Error submitting listing:", error);
    });
};
