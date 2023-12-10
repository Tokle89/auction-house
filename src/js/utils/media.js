export const checkMedia = (media) => {
  if (media && media.length > 0 && media.includes("http")) {
    return media;
  } else {
    return "https://via.placeholder.com/300x200?text=No+image+available";
  }
};

export const verifyImg = (media) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = media;
    img.onload = () => {
      resolve(media);
    };
    img.onerror = () => {
      resolve(false);
    };
  });
};
