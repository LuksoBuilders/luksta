/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Language, Description } from "@mui/icons-material";
import { BsDiscord, BsTelegram, BsTwitter, BsGithub } from "react-icons/bs";
import { useProjectForm } from "../../../data/project-form/useProjectForm";

const linksItems = [
  {
    label: "Website",
    icon: <Language />,
    value: "website",
  },
  {
    label: "Whitepaper",
    icon: <Description />,
    value: "whitepaper",
  },
  {
    label: "Discord",
    icon: <BsDiscord />,
    value: "discord",
  },
  {
    label: "Telegram",
    icon: <BsTelegram />,
    value: "telegram",
  },
  {
    label: "Twitter",
    icon: <BsTwitter />,
    value: "twitter",
  },
  {
    label: "Github",
    icon: <BsGithub />,
    value: "github",
  },
];

const ProjectSocials = () => {
  const { projectData, projectActions, submitted } = useProjectForm();

  const links = projectData.details.links;
  const setLink = projectActions.details.setLink;

  return (
    <div>
      <Typography
        css={css`
          margin-bottom: 0.15em;
          font-weight: 500;
        `}
        variant="h5"
      >
        Links And Social Medias
      </Typography>
      <Typography
        css={css`
          margin-bottom: 1.5em;
        `}
        variant="body1"
      >
        Add your website, whitepapers, and social media for furthur contact.
      </Typography>

      <Grid container spacing={"1em"}>
        {linksItems.map((item, i) => (
          <Grid item key={i} md={6}>
            <TextField
              fullWidth
              label={item.label}
              name={item.value}
              value={links[item.value]}
              onChange={(e) => setLink(item.value, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      css={css`
                        font-size: 20px;
                      `}
                    >
                      {item.icon}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ProjectSocials;
