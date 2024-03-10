import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "../public/stepper.css";

const steps = [
  'Registration',
  'Create a Profile',
  'Join a Team (Optional)',
];

export default function RegistrationStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={false} active={true}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

function ProfileStepper({ registrationCompleted }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} active={true} completed={index === 0 && registrationCompleted}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export { ProfileStepper };