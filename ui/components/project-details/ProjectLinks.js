/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar, IconButton } from "@mui/material";

import { BsDiscord, BsTelegram, BsTwitter, BsGithub } from "react-icons/bs";

const ProjectLinks = ({ project }) => {
  const { data, error, loading } = project;
  if (!data) return;

  const formattedLinks = data.profile?.links.reduce((pV, cV) => {
    const links = { ...pV };
    links[cV[0]] = cV[1];
    return links;
  }, {});

  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>
          <Typography variant="h6">Website</Typography>
          <Typography variant="subtitle1">
            <a target="_blank" href={formattedLinks["website"]}>
              {data.profile.name}
            </a>
          </Typography>
        </div>
        <div>
          <Typography variant="h6">Document</Typography>
          <a target="_blank" href={formattedLinks["whitepaper"]}>
            White Paper
          </a>
        </div>
        <div>
          <Typography variant="h6">Social Media</Typography>
          <div>
            <IconButton
              target="_blank"
              href={formattedLinks["discord"]}
              color="primary"
              size="small"
            >
              <BsDiscord />
            </IconButton>
            <IconButton
              target="_blank"
              href={formattedLinks["telegram"]}
              color="primary"
              size="small"
            >
              <BsTelegram />
            </IconButton>
            <IconButton
              target="_blank"
              href={formattedLinks["twitter"]}
              color="primary"
              size="small"
            >
              <BsTwitter />
            </IconButton>
            <IconButton
              target="_blank"
              href={formattedLinks["github"]}
              color="primary"
              size="small"
            >
              <BsGithub />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectLinks;
