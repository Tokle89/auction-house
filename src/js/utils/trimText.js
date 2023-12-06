export const trimText = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

const title =
  "This is a very long title that is overly long and should be trimmed";

console.log(trimText(title, 10));
