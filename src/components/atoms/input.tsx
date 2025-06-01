// components/atoms/Input.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;

  .MuiInputBase-root {
    background-color: #fff;
    border-radius: 8px;
  }
`;

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return <StyledTextField fullWidth variant="outlined" label={label} {...props} />;
};
