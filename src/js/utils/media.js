/**
 * Check if media is available, is longer than 0, and is a url that includes http.
 * If true return the media url, if false return a placeholder image.
 * @param {url} media
 * @returns {url}
 * @example
 * //Example usage:
 * checkMedia("https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg");
 * returns "https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg"
 */

export const checkMedia = (media) => {
  const url = Array.isArray(media) ? media[0]?.url : media?.url;
  return url && url.includes("http") ? url : "https://via.placeholder.com/300x200?text=No+image+available";
};
