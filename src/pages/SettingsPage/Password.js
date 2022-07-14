import React from 'react';
import {
  TextField,
  InputProps,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Password({
  name,
  type,
  value,
  handleShowPassword,
  label,
  handleChange,
}) {
  return (
    <div className="passwordInput">
      <TextField
        name={name}
        type={type}
        variant="outlined"
        fullWidth
        required
        label={label}
        onChange={handleChange}
        InputProps={
          value
            ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
            : null
        }
      />
    </div>
  );
}

export default Password;
