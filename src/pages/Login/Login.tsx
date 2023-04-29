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
import Logo from "../../components/Logo/Logo";
import userLogin from "../../services/userLogin";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = () => {
    userLogin({ email, password })
      .then(setAuthState)
      .then(() => navigate("/"))
  };
  const inputHandler = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };
  return (
    <Box sx={{ position: "fixed",
    paddingTop:"15vh",
    
    width: "100%",
    height: "100%",
    backgroundColor: "primary.main",}}>
      <Logo sx={{ position: "absolute", top: 0, left: 0, margin: "20px" }}></Logo>
        <Box
      sx={{
        
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        height: "70vh",
        width: "80vh",
        backgroundColor : "white"
      }}
    >
      
      <ContainerForm title={"Login to your account"} buttonText="Login" needRoutingLink={true} isRegistered={false} sx={{alignItems:"center"}} onSubmit={handleSubmit}>
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
      
      </ContainerForm>
      
    </Box>
    </Box>
    
  );
}

export default Login;
