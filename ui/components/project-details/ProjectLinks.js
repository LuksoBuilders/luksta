/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Grid, IconButton } from "@mui/material";

import { BsDiscord, BsTelegram, BsTwitter, BsGithub } from "react-icons/bs";

function formatEthereumAddress(address) {
  // Check if the address is a valid Ethereum address (basic validation)
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  // Extract the first 6 characters, last 6 characters, and add ellipsis in between
  const start = address.slice(0, 6);
  const end = address.slice(-6);
  const middle = "...";

  // Concatenate the parts and return the formatted address
  return `${start}${middle}${end}`;
}

const ProjectLinks = ({ project }) => {
  const { data, error, loading } = project;
  if (!data) return;

  const formattedLinks = data.profile?.links.reduce((pV, cV) => {
    const links = { ...pV };
    links[cV[0]] = cV[1];
    return links;
  }, {});

  console.log(project);

  const renderInfoRow = (label, address) => {
    return (
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25em;
        `}
      >
        <Typography variant="body1">{label}</Typography>

        <Typography variant="body1">
          <a
            href={`https://explorer.execution.testnet.lukso.network/address/${address}`}
            target="_blank"
          >
            {formatEthereumAddress(address)}
          </a>
        </Typography>
      </div>
    );
  };

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
      <div
        css={css`
          margin-top: 1em;
        `}
      ></div>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <div>{renderInfoRow("Universal Profile", data.universalProfile)}</div>
          <div>{renderInfoRow("Founder's Vault", data.founderVault)}</div>
          <div>{renderInfoRow("Investor's Vault", data.investorsVault)}</div>
          <div>{renderInfoRow("Treasury's Vault", data.treasuryVault)}</div>
        </Grid>
        <Grid item md={6}>
          <div>{renderInfoRow("Governance Token", data.projectToken)}</div>
          <div>
            {renderInfoRow(
              "Founder's Vesting Wallet",
              data.foundersVestingWallet
            )}
          </div>
          <div>
            {renderInfoRow(
              "Investor's Vesting Wallet",
              data.investorsVestingWallet
            )}
          </div>
          <div>
            {renderInfoRow("Universal Delegate UP", data.universalDelegateUp)}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProjectLinks;
