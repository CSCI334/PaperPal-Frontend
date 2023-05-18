import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import AuthState from "../../types/AuthData";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

//todo: cleanup
async function verifyAccount(token: string | null, password: string) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ?? ""}`
        }
        const { data } = await axios.post("/verify", {
            password: password,
        }, { headers: headers })
        return data;
    } catch (error) { errorHandler(error) }
}

export default verifyAccount;
