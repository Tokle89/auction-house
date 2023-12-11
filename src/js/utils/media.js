export const checkMedia = (media) => {
  if (media && media.length > 0 && media.includes("http")) {
    return media;
  } else {
    return "https://via.placeholder.com/300x200?text=No+image+available";
  }
};
