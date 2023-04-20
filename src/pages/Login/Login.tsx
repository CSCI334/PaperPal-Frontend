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

function Login() {
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
      
      <ContainerForm title={"Login to your account"} buttonText="Login" needRoutingLink={true} isRegistered={false} sx={{alignItems:"center"}} >
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
    </Box>
    
  );
}

export default Login;
