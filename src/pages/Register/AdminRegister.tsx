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


function AdminRegister() {
    const {
        passwordInputProps,
        retypeInputProps,
        passwordError,
        matchError,
    } = usePasswordInput("");
    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth();
    const [ searchParams, setSearchParams ] = useSearchParams({});
    const onClick = httpOnClick(() => {
        if (passwordError || matchError) {
            return Promise.reject()
        }
        const token = searchParams.get("token")
        return verifyAccount(token, passwordInputProps.value)
    }, value => {
        const decodedJWT = jwtDecode(value.token);
        console.log(value.token)
        const headers = { Authorization: `Bearer ${value.token}` };
        const loggedIn = { headers, isAuth: true, userData: decodedJWT };
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        localStorage.setItem("jwtToken", value.token)
        setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""));
        navigate("/")

    }, "Succesfully verified account")

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: "1",
                flexDirection: "row",
            }}
        >
            <LeftBanner></LeftBanner>
            <ContainerForm title={"Create Admin account"} buttonText="Create account" onSubmit={onClick}>
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

export default AdminRegister;
