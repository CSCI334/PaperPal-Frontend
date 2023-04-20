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

  function Register() {
    return (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "row",
          }}
        >
          <LeftBanner></LeftBanner>
          <ContainerForm title={"Create author account"} buttonText="Create account" needRoutingLink={true} isRegistered={true} >
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
            <PasswordForm onChange={() => {}}></PasswordForm>
          
          </ContainerForm>
          
        </Box>
      );
  }
  
  export default Register;