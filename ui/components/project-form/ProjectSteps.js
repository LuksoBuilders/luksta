/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";

import DetailsForm from "./details-form";
import TokenManagement from "./token-management";
import Vesting from "./vesting";
import AuctionDetails from "./auction-details";
import Whitelisting from "./whitelisting";

import { useProjectForm } from "../../data/project-form/useProjectForm";

const steps = [
  "Project Details",
  "Token Management",
  "Vesting",
  "Auction Details",
  "Whitelisting",
];

export default function HorizontalNonLinearStepper() {
  const {
    detailsCompleted,
    completeDetails,
    completeTokenManagement,
    tokenManagementCompleted,
    completeVesting,
    vestingCompleted,
    completeAuctionManagement,
    auctionManagementCompleted,
    whitelistingCompleted,
    completeWhitelisting,
    createProject,
    projectCreationState,
    projectCreationError,
  } = useProjectForm();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return (
      detailsCompleted &&
      tokenManagementCompleted &&
      vestingCompleted &&
      auctionManagementCompleted &&
      whitelistingCompleted
    );
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (activeStep === 0) {
      completeDetails() ? handleNext() : null;
    } else if (activeStep === 1) {
      completeTokenManagement() ? handleNext() : null;
    } else if (activeStep === 2) {
      completeVesting() ? handleNext() : null;
    } else if (activeStep === 3) {
      completeAuctionManagement() ? handleNext() : null;
    } else {
      completeWhitelisting() ? handleNext() : null;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <DetailsForm />
          </div>
        );
      case 1:
        return (
          <div>
            <TokenManagement />
          </div>
        );
      case 2:
        return (
          <div>
            <Vesting />
          </div>
        );
      case 3:
        return (
          <div>
            <AuctionDetails />
          </div>
        );
      case 4:
        return (
          <div>
            <Whitelisting />
          </div>
        );
    }
  };

  const isCompleted = (index) => {
    if (index === 0) return detailsCompleted;
    if (index === 1) return tokenManagementCompleted;
    if (index === 2) return vestingCompleted;
    if (index === 3) return auctionManagementCompleted;
    if (index === 4) return whitelistingCompleted;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={isCompleted(index)}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {false ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              css={css`
                padding: 0.9em;
                margin-top: 2em;
              `}
            >
              {renderStep()}
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {
                /*allStepsCompleted()*/ true ? (
                  <Button
                    onClick={() => {
                      createProject();
                    }}
                  >
                    Launch Project
                  </Button>
                ) : (
                  activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))
                )
              }
            </Box>
          </React.Fragment>
        )}
      </div>
      <Dialog open={!!projectCreationState} onClose={() => {}}>
        <DialogTitle id="alert-dialog-title">Creating your project</DialogTitle>
        <DialogContent>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 400px;
            `}
          >
            <Typography variant="h6">{projectCreationState}</Typography>
            {projectCreationState !== "Failed" ? <CircularProgress /> : ""}
          </div>
          {!!projectCreationError && (
            <Typography
              css={(theme) =>
                css`
                  color: ${theme.palette.error.main};
                `
              }
              variant="body1"
            >
              {projectCreationError}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
