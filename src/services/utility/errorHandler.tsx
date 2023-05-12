import { AxiosError } from "axios";

function errorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      const { status, data } = error.response;
      throw `HTTP Error ${status}: ${data.message}`;
    } else if (error.request) {
      throw "No response received from the server";
    } else {
      throw "An unknown error occurred";
    }
  } else {
    throw error;
  }
}

export default errorHandler;
