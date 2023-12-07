export const checkMedia = (media) => {
  if (media.length < 1) {
    return "https://via.placeholder.com/300x200?text=No+image+available";
  } else {
    return media[0];
  }
};

export const verifyImg = (media) => {
  const img = new Image();
  img.src = media;
  img.onload = () => {
    return true;
  };

  if (img.onload) {
    return media;
  }
};
