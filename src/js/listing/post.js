import * as storage from "../storage/index.js";
import * as url from "../api/constant.js";
import { apiCall } from "../api/api.js";

export const handleSubmitListing = (event) => {
  event.preventDefault();

  const [title, description, tags, endsAt] = event.target.elements;

  let mediaArr = [];
  const mediaGallery = document.querySelectorAll(`input[name="media"]:enabled`);

  mediaGallery.forEach((media) => {
    mediaArr.push(verifyImg(media.value));
  });

  if (mediaArr.length === 0) {
    mediaArr = null;
  }

  const tagsArr = tags.value.replace(/\s+/g, "").split(",");

  submitPosting(title, description, tagsArr, new Date(endsAt.value), mediaArr);
};

const submitPosting = (title, description, tags, endsAt, media) => {
  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.get("token")}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        endsAt: endsAt,
        tags: tags,
        media: media,
      }),
    };
    apiCall(url.BASE + url.LISTINGS, fetchOptions).then((result) => {
      console.log(result);
      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        window.location.replace(`../../../listing/?id=${result.id}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyImg = (media) => {
  const img = new Image();
  img.src = media;
  img.onload = () => {
    return true;
  };

  if (img.onload) {
    return media;
  }
};
