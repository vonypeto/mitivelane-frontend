import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useCert() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentList, setCUrrentList] = useState([]);

  function setCurrentFunctionList(photo) {
    return setCUrrentList(photo);
  }

  const value = {
    currentList,
    setCurrentFunctionList,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
