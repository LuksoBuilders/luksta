export const ipfsUrlToNormal = (url) => {
  if (url?.includes("ipfs://")) {
    const cid = url.replace("ipfs://", "");
    return `https://cloudflare-ipfs.com/ipfs/${cid}`;
  }
  return url;
};

export const ipfsUrlResolver = (cid) => {
  return `https://cloudflare-ipfs.com/ipfs/${cid}`;
};

export const ipfsAddressResolver = (cid) => {
  return `ipfs://${cid}`;
};
