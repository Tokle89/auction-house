import { sendListing } from "./index.js";

export const handleSubmitListing = (event) => {
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
