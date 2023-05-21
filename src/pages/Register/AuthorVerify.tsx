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
import { useAuth } from "../../context/AuthContext";
import httpOnClick from "../../hooks/httpOnClick";
import verifyAccount from "../../services/account/verifyAccount";
import jwtDecode from "jwt-decode";
import AuthState from "../../types/AuthData";
import { useEffect } from "react";
import verifyAuthor from "../../services/account/verifyAuthor";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";


function AuthorVerify() {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams({});
    const { isLoading, setIsLoading } = useLoading()
    const { snackbar, setSnackbar } = useSnackbar()
    const token = searchParams.get("token")
    useEffect(() => {
        setIsLoading(true);
        verifyAuthor(token).then((value) => {
            const decodedJWT = jwtDecode(value.token);
            console.log(value.token)
            const headers = { Authorization: `Bearer ${value.token}` };
            const loggedIn = { headers, isAuth: true, userData: decodedJWT };
            localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
            localStorage.setItem("jwtToken", value.token)
            setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""));
            setSnackbar({ message: "Email Verified", severity: "success" })
            navigate("/")
        }).catch((value) => {
            const severity = value.status >= 500 ? "error" : "warning"
            setSnackbar({ message: value.message, severity: severity })
        }).finally(() => {
            setIsLoading(false)
        })

    }, [searchParams])
    // const onClick = httpOnClick(() => {

    // //   return verifyAccount(token, passwordInputProps.value)
    // }, value => {
    //   const decodedJWT = jwtDecode(value.token);
    //   console.log(value.token)
    //   const headers = { Authorization: `Bearer ${value.token}` };
    //   const loggedIn = { headers, isAuth: true, userData: decodedJWT };
    //   localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
    //   localStorage.setItem("jwtToken", value.token)
    //   setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""));
    //   navigate("/")

    // }, "Succesfully verified account")

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: "1",
                flexDirection: "row",
            }}
        >
            <LeftBanner></LeftBanner>
            <Typography variant="h2" margin={"auto"} sx={{ flex: "20%" }}>Verifying email...</Typography>


        </Box>
    );
}

export default AuthorVerify;
