export const checkMedia = (media) => {
  if (media.length < 1) {
    return "https://via.placeholder.com/300x200?text=No+image+available";
  } else {
    return media[0];
  }
};
