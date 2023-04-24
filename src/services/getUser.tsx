import axios from "axios";
import errorHandler from "./errorHandler";

async function getUser() {
  try {
    const { data } = await axios({ url: "/user" });

    return data;
  } catch (error) {
    errorHandler(error);
  }
}

export default getUser;
