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

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
      }}
    >
      <LeftBanner></LeftBanner>
      <ContainerForm title={"Login"} buttonText="Login">
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

export default Login;
