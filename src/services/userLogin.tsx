import axios from "axios";
import errorHandler from "./errorHandler";
import jwtDecode from "jwt-decode";

async function userLogin({ email ="", password ="" }) {
  try {
    // const { data } = await axios({
    //   data: { user: { email, password } },
    //   method: "POST",
    //   url: "api/users/login",
    // });

    const tokenList = {"admin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJBRE1JTiIsImNvbmZlcmVuY2VJZCI6bnVsbCwiaWF0IjoxNjgyNzQ4MTM3LCJleHAiOjE2ODMwMDczMzd9.CIrHMoNyp9PHbloOI3iloMy53xfBAuMTCmRf-AWaAO0",
"reviewer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJSRVZJRVdFUiIsImNvbmZlcmVuY2VJZCI6bnVsbCwiaWF0IjoxNjgyNzQ4MTM3LCJleHAiOjE2ODMwMDczMzd9.O8oVoTnOfjCQ_Wr4P2-PQ9L99xP6mDKH8-BgwJCj2R8",
"author": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJBVVRIT1IiLCJjb25mZXJlbmNlSWQiOm51bGwsImlhdCI6MTY4Mjc0ODEzNywiZXhwIjoxNjgzMDA3MzM3fQ.1O-505fa8-Y6n87t0ji9Kz1OHohbMZXfD5Ia4IS-6vE"}
    
// TODO: API endpoint, return a token of jwt, need to decrypt 
  
    const jwtToken = tokenList.admin;
    // Decripting JWT token
    const decodedJWT = jwtDecode(jwtToken);
    const headers = { Authorization: jwtToken };

    const loggedIn = { headers, isAuth: true, userData: decodedJWT };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    errorHandler(error);
  }
}

export default userLogin;