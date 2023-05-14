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
import Logo from "../../components/Logo/Logo";
import userLogin from "../../services/account/userLogin";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthState from "../../types/AuthData";

function Login() {
  const [ { email, password }, setForm ] = useState({ email: "", password: "" });
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    userLogin({ email, password })
      .then((value) => {
        setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""));
      })
      .then(() => navigate("/"))
  };

  const inputHandler = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [ name ]: value }));
  };

  return (
    <Box sx={{
      position: "fixed",
      paddingTop: "15vh",
      width: "100%",
      height: "100%",
      backgroundColor: "primary.main",
    }}>
      <Logo sx={{ position: "absolute", top: 0, left: 0, margin: "20px" }}></Logo>
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          height: "70vh",
          width: "80vh",
          backgroundColor: "white"
        }}
      >
        <ContainerForm title={"Login to your account"} sx={{ alignItems: "center" }} onSubmit={handleSubmit}>
          <TextField
            sx={{
              width: "100%",
              borderRadius: "20px",
            }}
            name="email"
            onChange={inputHandler}
            variant={"outlined"}
            label="Email"
            margin="normal"
            required
          />
          <PasswordForm onChange={inputHandler}></PasswordForm>
          <Button
            sx={{
              marginY: "20px",
            }}
            variant="contained"
            color="button"
            type="submit"
          > Login</Button>
        </ContainerForm>
        <Typography variant="body2">
          {"Don't have an author account?"}
          <MuiLink component={Link} to={"/register-author"}>
            {" Sign up"}
          </MuiLink>
        </Typography>
      </Box>
    </Box>

  );
}

export default Login;
