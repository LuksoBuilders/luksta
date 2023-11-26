/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";

const AuctionAction = ({ project }) => {
  const { data, error, loading } = project;
  if (!data) return;

  console.log(data);

  data.auction;

  return <div>This is AuctionAction</div>;
};
export default AuctionAction;
