import { createContext } from "react"

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => { },
    logout: () => { },
    customerIsLoggedIn: true,
    customerId: null,
    customerToken: null,
    customerLogin: () => {},
    customerLogout: () => {}

})