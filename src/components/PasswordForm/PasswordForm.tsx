import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { ChangeEventHandler, useState } from "react";

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  label?: string;
  name?: string;
  error?: boolean;
  errorMsg?: string;
}

export default function PasswordForm({
  onChange,
  label,
  name,
  error,
  errorMsg,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" sx={{ marginTop: "24px" }}>
      <InputLabel>{label ? label : "Password"}</InputLabel>
      <OutlinedInput
        error={error}
        onChange={onChange}
        name={name ? name : "password"}
        required={true}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label ? label : "Password"}
      ></OutlinedInput>
      <FormHelperText>{errorMsg}</FormHelperText>
    </FormControl>
  );
}
