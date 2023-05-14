const defaultAuthState = {
  headers: {},
  isAuth: false,
  userData: {
    email: "",
    username: "",
  },
  userType: "ADMIN",
};

class AuthState {
  constructor(
    public headers: {
      Authorization?: string;
    },
    public isAuth: boolean,
    public userData: any,
    public userType: string
  ) { }
  static createFromString(json: string): AuthState {
    if (!json || json === "") {
      return {
        headers: {},
        isAuth: false,
        userData: {
          email: "",
          username: "",
        },
        userType: "ADMIN",
      };
    }
    let authState = json
    try {
      return JSON.parse(json) as AuthState
    } catch {
      return defaultAuthState
    }
  }
}

export default AuthState;
