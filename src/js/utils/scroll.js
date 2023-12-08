export const scrollToListings = () => {
  const container = document.querySelector(".filter-container");
  container.scrollIntoView({ behavior: "smooth" });
};
