import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "auth/FirebaseAuth";
import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";

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
        Authorization: `Bearer ${token}`,
      },
    });
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
