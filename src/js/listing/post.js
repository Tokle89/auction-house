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
  console.log("submitting listing");

  const [title, description, tags, endsAt] = event.target.elements;

  let mediaArr = [];
  const mediaGallery = document.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((media) => {
    if (media.value.trim() !== "") {
      mediaArr.push(media.value);
    }
  });

  const tagsArr = tags.value
    .replace(/\s+/g, "")
    .split(",")
    .filter((tag) => tag !== "");

  sendListing(
    "POST",
    null,
    title,
    description,
    tagsArr,
    new Date(endsAt.value),
    mediaArr,
  );
};
