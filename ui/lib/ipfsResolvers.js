export const ipfsUrlToNormal = (url) => {
  if (url?.includes("ipfs://")) {
    const cid = url.replace("ipfs://", "");
    return `https://api.universalprofile.cloud/ipfs/${cid}`;
  }
  return url;
};

export const ipfsUrlResolver = (cid) => {
  return `https://api.universalprofile.cloud/ipfs/${cid}`;
};

export const ipfsAddressResolver = (cid) => {
  return `ipfs://${cid}`;
};
