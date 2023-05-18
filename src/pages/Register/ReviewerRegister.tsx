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
import { usePasswordInput } from "../../hooks/Register";
import { useNavigate, useSearchParams } from "react-router-dom";
import verifyAccount from "../../services/account/verifyAccount";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";

function ReviewerRegister() {
  const navigate = useNavigate();
  const {
    passwordInputProps,
    retypeInputProps,
    passwordError,
    matchError,
  } = usePasswordInput("");
  const [searchParams, setSearchParams] = useSearchParams({});

  const { isLoading, setIsLoading } = useLoading()
  const { snackbar, setSnackbar } = useSnackbar()




  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError || matchError) {
      return;
    }
    const token = searchParams.get("token")

    console.log(searchParams.get("token"))
    console.log(passwordInputProps.value)

    verifyAccount(token, passwordInputProps.value)
      .then(() => navigate("/"))
      .catch((value) => {
        const severity = value.status >= 500 ? "error" : "warning"
        setSnackbar({ message: value.message, severity: severity })
      })
      .finally(() => {
        setIsLoading(false)
      })
    navigate("/login");

  }
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
      }}
    >
      <LeftBanner></LeftBanner>
      <ContainerForm title={"Create reviewer account"} buttonText="Create account" onSubmit={handleSubmit}  >
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

export default ReviewerRegister;
