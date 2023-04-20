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

  function ChairRegister() {
    return (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "row",
          }}
        >
          <LeftBanner></LeftBanner>
          <ContainerForm title={"Create conference chair account"} buttonText="Create account" needRoutingLink={true} isRegistered={true} >
            <PasswordForm onChange={() => {}}></PasswordForm>
          </ContainerForm>
          
        </Box>
      );
  }
  
  export default ChairRegister;