import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "auth/FirebaseAuth";
import {
  AUTH_BARANGAY,
  AUTH_BARANGAY_LIST,
  ACCESS_TOKEN,
} from "redux/constants/Auth";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [currentBarangay, setCurrentBarangay] = useState();
  const [currentBarangayMemberList, setCurrentBarangayMemberList] = useState();
  const [authorization, setAuthorization] = useState();

  const [loading, setLoading] = useState(true);
  function setBarangay(barangay) {
    return setCurrentBarangay(barangay);
  }
  function setBarangayMemberList(barangay) {
    return setCurrentBarangayMemberList(barangay);
  }
  function checkUserBarangay() {
    const item = localStorage.getItem(AUTH_BARANGAY);
    if (item) {
      setCurrentBarangay(item);
    }
  }
  function authorizationConfig(token) {
    return setAuthorization({
      headers: {
        authorization: `Bearer ${token}`,
        "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy":
          " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
      },
    });
  }
  function generateToken() {
    let response = jwt_decode(localStorage.getItem("access_token"));
    const date = new Date().getTime() / 1000;
    const unix = Math.round(date);
    const data = {
      auth_id: response.auth_id,
      iat: unix,
      exp: unix + 60,
    };
    const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
    const header = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy":
          " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
      },
    };
    authorizationConfig(jwt);
    return [jwt, header];
  }
  useEffect(() => {
    const listener = window.addEventListener("storage", checkUserBarangay);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentuser(user);
      setLoading(false);
    });
    const combinedData = {
      listener,
      unsubscribe,
    };
    return () => [{ combinedData }];
  }, []);

  const value = {
    currentBarangay,
    setBarangay,
    setBarangayMemberList,
    currentUser,
    currentBarangayMemberList,
    authorizationConfig,
    authorization,
    generateToken,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
