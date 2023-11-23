/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ButtonBase,
  Typography,
  Avatar,
  MobileStepper,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ipfsResolver } from "../../data/ipfsResolver";
import { useState, useEffect } from "react";

const SlideShow = ({ project }) => {
  const { data, loading, error } = project;
  const showLoading = !data;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const profile = data?.profile;

  const images = profile?.images;

  const currentImage = images?.[currentImageIndex][1].url;

  const imagesLength = images ? images.length : 0;

  const goNext = () => {
    if (currentImageIndex < imagesLength - 1) {
      return setCurrentImageIndex(currentImageIndex + 1);
    }
    return setCurrentImageIndex(0);
  };

  const goBack = () => {
    console.log(currentImageIndex);
    if (currentImageIndex === 0) {
      return setCurrentImageIndex(imagesLength - 1);
    }
    return setCurrentImageIndex(currentImageIndex - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      goNext();
    }, 5 * 1000);
  }, [currentImageIndex, goNext]);

  if (!data) return <div></div>;

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          border-radius: 10px;
          overflow: hidden;
        `}
      >
        <img
          css={css`
            width: 100%;
            max-height: 480px;
            object-fit: cover;
            display: block;
          `}
          src={ipfsResolver(currentImage)}
        />
      </div>
      <div
        css={css`
          position: absolute;
          bottom: 15px;
          left: 15px;
        `}
      >
        <div css={css``}>
          <div>
            <IconButton
              size="small"
              css={(theme) =>
                css`
                  background: ${theme.palette.background.default} !important;
                  color: ${theme.palette.primary.main};
                  margin-right: 0.25em;
                `
              }
              onClick={() => goBack()}
            >
              <ArrowBack
                css={css`
                  font-size: 16px;
                `}
              />
            </IconButton>
            <IconButton
              size="small"
              css={(theme) =>
                css`
                  background: ${theme.palette.background.default} !important;
                  color: ${theme.palette.primary.main};
                `
              }
              onClick={() => goNext()}
            >
              <ArrowForward
                css={css`
                  font-size: 16px;
                `}
              />
            </IconButton>
          </div>
          <div
            css={css`
              position: relative;
              width: calc(${imagesLength * 10}px + 32px);
              left: 75px;
              bottom: 1px;
            `}
          >
            <MobileStepper
              css={css`
                position: absolute;
                display: inline-block;
              `}
              variant="dots"
              steps={imagesLength}
              activeStep={currentImageIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlideShow;
