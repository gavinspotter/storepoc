import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  customerIsLoggedIn: false,
  customerId: null,
  customerToken: null,
  customerLogin: () => {},
  customerLogout: () => {},
  messageRef: null,
  setMessageRef: () => {},
  messageBoardId: null,
  setMessageBoardId: () => {},
});
