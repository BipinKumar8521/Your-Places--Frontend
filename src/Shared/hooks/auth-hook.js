import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState();
  const [expirationTime, setExpirationTime] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setLoggedInUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setToken(null);
    setExpirationTime(null);
    setLoggedInUserId(null);
  }, []);

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

  useEffect(() => {
    if (token && expirationTime) {
      const remainingTime = expirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expirationTime]);

  return { login, logout, loggedInUserId, token };
};
