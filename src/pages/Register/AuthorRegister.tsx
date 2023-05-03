import {
    Box,
    Button,
    Container,
    Input,
    TextField,
    Typography,
  } from "@mui/material";
  import LeftBanner from "../../components/LeftBanner/LeftBanner";
  import ContainerForm from "../../components/FormContainer/ContainerForm";
  import PasswordForm from "../../components/PasswordForm/PasswordForm";
import { useState } from "react";
import { usePasswordInput } from "../../hooks/Register";

  function Register() {

    const {
      passwordInputProps,
      retypeInputProps,
      passwordError,
      matchError,
    } = usePasswordInput("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (passwordError || matchError) {
        return;
      }
  
      // Submit form
    };

    return (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "row",
          }}
        >
          <LeftBanner></LeftBanner>
          <ContainerForm title={"Create author account"} buttonText="Create account" needRoutingLink={true} isRegistered={true} onSubmit={handleSubmit}>
            <TextField
              sx={{
                width: "100%",
                borderRadius: "20px",
              }}
              variant={"outlined"}
              label="Email"
              margin="normal"
              required
            />
            <PasswordForm name="password" {...passwordInputProps}></PasswordForm>
            {passwordError && (
          <span style={{ color: "red" }}>
            Password needs to be at least 8 characters long
          </span>
        )}
            <PasswordForm name="retype" label="Retype Password" {...retypeInputProps} ></PasswordForm>
            {matchError && (
          <span style={{ color: "red" }}>Passwords do not match</span>
        )}
            
          </ContainerForm>
          
        </Box>
      );
  }
  
  export default Register;