export const minBid = (bids) => {
  if (bids.length > 0) {
    const latestBid = findLatestBid(bids);
    return latestBid.amount + 1;
  } else {
    return 1;
  }
};

export const findLatestBid = (bids) => {
  let latestBid = bids.sort((a, b) => b.amount - a.amount)[0];
  return latestBid;
};
