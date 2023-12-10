import { sendListing } from "./index.js";
import { verifyImg } from "../utils/media.js";
export const handleSubmitListing = async (event) => {
  event.preventDefault();

  let invalidImageDetected = false;

  const [title, description, tags, endsAt] = event.target.elements;

  const mediaGallery = document.querySelectorAll(`input[name="media"]:enabled`);

  const mediaArr = await Promise.all(
    Array.from(mediaGallery).map(async (media) => {
      const loadable = await verifyImg(media.value);
      if (!loadable) {
        media.value = "invalid url";
        media.classList.add("is-invalid");
        invalidImageDetected = true;
      }
      return loadable ? media.value : null;
    }),
  );
  if (invalidImageDetected) return;

  const validMediaArr = mediaArr.filter((media) => media !== null);

  const tagsArr = tags.value.replace(/\s+/g, "").split(",");

  sendListing(
    "POST",
    undefined,
    title,
    description,
    tagsArr,
    new Date(endsAt.value),
    validMediaArr,
  );
};
