import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "auth/FirebaseAuth";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [currentBarangay, setCurrentBarangay] = useState();
  const [currentBarangayMemberList, setCurrentBarangayMemberList] = useState();

  const [loading, setLoading] = useState(true);
  function setBarangay(barangay) {
    return setCurrentBarangay(barangay);
  }
  function setBarangayMemberList(barangay) {
    return setCurrentBarangayMemberList(barangay);
  }
  function checkUserBarangay() {
    const item = localStorage.getItem("auth_barangay");
    if (item) {
      setCurrentBarangay(item);
    }
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
