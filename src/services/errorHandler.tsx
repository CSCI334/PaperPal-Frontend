import { AxiosError } from "axios";
import HttpError from "../types/HttpError";

function errorHandler(error: unknown) {
  if (error instanceof HttpError) {
    const [status, data] = [error.getStatus(), error.getData()];

    if ([401, 403, 404, 422, 500].includes(status)) {
      console.log(status, data.errors.body[0]);
      throw data.errors.body[0];
    }
    console.dir(error);
  } else if (error instanceof AxiosError) {
    if ((error.message = "NETWORK_ERROR")) error.stack = "";
    throw "Can't connect to server";
  }
}

export default errorHandler;
