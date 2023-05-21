import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
  Link as MuiLink
} from "@mui/material";
import LeftBanner from "../../components/LeftBanner/LeftBanner";
import ContainerForm from "../../components/FormContainer/ContainerForm";
import PasswordForm from "../../components/PasswordForm/PasswordForm";
import { useState } from "react";
import { usePasswordInput } from "../../hooks/Register";
import { Link } from "react-router-dom";
import authorRegister from "../../services/account/authorRegister";
import { useAuth } from "../../context/AuthContext";
import AuthState from "../../types/AuthData";
import { useNavigate } from "react-router-dom";

function Register() {
  const { setAuthState } = useAuth();
  const [{ email, password, username }, setForm] = useState({ email: "", password: "", username: "" });
  const [{ confirmPassword, errorMessage }, setConfirmPassword] = useState({
    confirmPassword: "",
    errorMessage: "",
  });
  const navigate = useNavigate();
  const inputHandler = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (passwordError || matchError) {
    //   return;
    // }
    authorRegister({ email, password, username }).then((value) => {
      setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""));
    }).then(() => navigate("/")).then(() => alert("Please verify your email and then login with your credential"))

    // Submit form
  };

  const confirmPasswordValidator = (e: {
    currentTarget: { name: any; value: any };
  }) => {
    const value = e.currentTarget.value;
    let errorMessage = "";
    if (password !== value) {
      errorMessage = "Password does not match";
    }
    setConfirmPassword({
      confirmPassword: value,
      errorMessage: errorMessage,
    });
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
      <ContainerForm title={"Create author account"} onSubmit={handleSubmit}>
        <TextField
          sx={{
            width: "100%",
            borderRadius: "20px",
          }}
          variant={"outlined"}
          label="Email"
          name="email"
          margin="normal"
          required
          onChange={inputHandler}
        />
        <TextField
          sx={{
            width: "100%",
            borderRadius: "20px",
          }}
          variant={"outlined"}
          label="Name"
          name="username"
          margin="normal"
          onChange={inputHandler}
          required
        />
        <PasswordForm name="password" onChange={inputHandler}></PasswordForm>
        {/* {passwordError && (
          <span style={{ color: "red" }}>
            Password needs to be at least 8 characters long
          </span>
        )} */}
        <PasswordForm
          error={password !== confirmPassword}
          onChange={confirmPasswordValidator}
          errorMsg={errorMessage}
          label="Confirm Password"
          name="confirm"
        ></PasswordForm>
        {/* {matchError && (
          <span style={{ color: "red" }}>Passwords do not match</span>
        )} */}
        <Button
          sx={{
            marginY: "20px",
          }}
          variant="contained"
          color="button"
          type="submit"
        > Sign up</Button>
        <Typography variant="body2">
          {"Already have an account?"}
          <MuiLink component={Link} to={"/login"}>
            {" Log in"}
          </MuiLink>
        </Typography>
      </ContainerForm>

    </Box>
  );
}

export default Register;
