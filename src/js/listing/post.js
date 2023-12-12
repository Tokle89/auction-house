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

  const [title, description, tags, endsAt] = event.target.elements;

  let mediaArr = [];
  const mediaGallery = document.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((media) => {
    mediaArr.push(media.value);
  });

  if (mediaArr.length === 0) {
    mediaArr = null;
  }

  const tagsArr = tags.value.replace(/\s+/g, "").split(",");

  sendListing(
    "POST",
    title,
    description,
    tagsArr,
    new Date(endsAt.value),
    mediaArr,
  );
};
