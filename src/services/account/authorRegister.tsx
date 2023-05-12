import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import AuthState from "../../types/AuthData";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

//todo: cleanup

async function authorRegister({ email = "", password = "", username = "" }) {
    try {
    const { data } = await axios.post("/register", {
      email: email,
      username: username,
      password: password,
      accountType: "AUTHOR",
    });
    const apiHeader = {
      Authorization: `Bearer ${data.token}`
    };
    try {
      const { data } = await axios.post(
        "/verify-author",
        {
          
        },
        { headers: apiHeader }
      );
      const jwtToken = data.token;
      // Decripting JWT token
      const decodedJWT = jwtDecode(jwtToken);
      const headers = { Authorization: jwtToken };

      const loggedIn = { headers, isAuth: true, userData: decodedJWT };

      localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

      return loggedIn;
    } catch (error) {
      errorHandler(error);
    }
  } catch (error) {errorHandler(error)}
}

export default authorRegister;
