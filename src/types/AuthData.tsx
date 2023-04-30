class AuthState {
  constructor(
    public headers: {
      Authorization?: string;
    },
    public isAuth: boolean,
    public userData: {}
  ) {}
  static createFromString(json: string): AuthState {
    if (!json || json === "") {
      return {
        headers: {},
        isAuth: false,
        userData: {
          email: "",
          userType: "ADMIN",
          username: "",
        },
      };
    }
    return JSON.parse(json) as AuthState;
  }
}

export default AuthState;
