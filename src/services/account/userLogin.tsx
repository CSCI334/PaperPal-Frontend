
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";

//todo: cleanup

async function userLogin({ email = "", password = "" }) {
  try {
    console.log("userLogin");
    const { data } = await axios.post(
      '/login',
      {
        email: email,
        password: password,
      },
    )
    // const { data } = await axios({
    //   data: { email: email, password: password },
    //   method: "POST",
    //   url: "login",
    // });

    const tokenList = {
      "admin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJBRE1JTiIsImNvbmZlcmVuY2VJZCI6bnVsbCwiaWF0IjoxNjgyNzQ4MTM3LCJleHAiOjE2ODMwMDczMzd9.CIrHMoNyp9PHbloOI3iloMy53xfBAuMTCmRf-AWaAO0",
      "reviewer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJSRVZJRVdFUiIsImNvbmZlcmVuY2VJZCI6bnVsbCwiaWF0IjoxNjgyNzQ4MTM3LCJleHAiOjE2ODMwMDczMzd9.O8oVoTnOfjCQ_Wr4P2-PQ9L99xP6mDKH8-BgwJCj2R8",
      "author": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiYWNjb3VudFR5cGUiOiJBVVRIT1IiLCJjb25mZXJlbmNlSWQiOm51bGwsImlhdCI6MTY4Mjc0ODEzNywiZXhwIjoxNjgzMDA3MzM3fQ.1O-505fa8-Y6n87t0ji9Kz1OHohbMZXfD5Ia4IS-6vE"
    }

    // TODO: API endpoint, return a token of jwt, need to decrypt 
    const jwtToken = data.token;
    // Decripting JWT token
    const decodedJWT = jwtDecode(jwtToken);
    const headers = { Authorization: jwtToken };

    const loggedIn = { headers, isAuth: true, userData: decodedJWT };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
    localStorage.setItem("jwtToken", jwtToken)
    return loggedIn;
  } catch (error) {
    errorHandler(error);
  }
}

export default userLogin;
