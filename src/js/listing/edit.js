import { sendListing } from "./index.js";
import { verifyImg } from "../utils/media.js";
export const handleEditListing = (id) => {
  event.preventDefault();

  const [title, description, tags, endsAt] = event.target.elements;

  let mediaArr = [];

  const form = document.getElementById("edit-listing-form");
  const mediaGallery = form.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((media) => {
    if (media.value !== "") {
      mediaArr.push(verifyImg(media.value));
    }
  });

  if (mediaArr.length === 0) {
    mediaArr = null;
  }

  const tagsArr = tags.value.replace(/\s+/g, "").split(",");
  console.log(id);
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
