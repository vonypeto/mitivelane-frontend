import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "../auth/FirebaseAuth";
const RegisterContext = React.createContext();

export function useRegister() {
  return useContext(RegisterContext);
}

export function AuthProvider({ children }) {
  useEffect(() => {}, []);

  const value = {};
  return (
    <RegisterContext.Provider value={value}>
      {!loading && children}
    </RegisterContext.Provider>
  );
}
