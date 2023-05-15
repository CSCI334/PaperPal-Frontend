import { AxiosError } from "axios";

function errorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      const { status, data } = error.response;
      throw { status: status, message: data.message };
    } else if (error.request) {
      throw { status: 500, message: "No response received from the server" };
    } else {
      throw { status: 500, message: "An unknown error occurred" };
    }
  } else {
    console.log(error)
    throw error;
  }
}

export default errorHandler;
