import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const [customerToken, setCustomerToken] = useState(false);
  const [customerTokenExpirationDate, setCustomerTokenExpirationDate] =
    useState();
  const [customerId, setCustomerId] = useState(false);

  const customerLogin = useCallback((uid, token, expirationDate) => {
    setCustomerToken(token);
    setCustomerId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setCustomerTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "customerData",
      JSON.stringify({
        customerId: uid,
        customerToken: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const customerLogout = useCallback(() => {
    setCustomerToken(null);
    setCustomerTokenExpirationDate(null);
    setCustomerId(null);
    localStorage.removeItem("customerData");
  }, []);

  useEffect(() => {
    if (customerToken && customerTokenExpirationDate) {
      const remainingTime =
        customerTokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(customerLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [customerToken, customerLogout, customerTokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("customerData"));
    if (
      storedData &&
      storedData.customerToken &&
      new Date(storedData.expiration) > new Date()
    ) {
      customerLogin(
        storedData.customerId,
        storedData.customerToken,
        new Date(storedData.expiration)
      );
    }
  }, [customerLogin]);

  const [messageRef, setMessageRef] = useState();

  return {
    token,
    login,
    logout,
    userId,
    customerToken,
    customerLogin,
    customerLogout,
    customerId,
    messageRef,
    setMessageRef,
  };
};
