import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  loggedInUserId: null,
  login: () => {},
  logout: () => {},
});
