export const sortArrayByEnding = (array) => {
  return array.sort((a, b) => {
    const dateA = new Date(a.endsAt);
    const dateB = new Date(b.endsAt);
    return dateA - dateB;
  });
};
