import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";

export async function registerBarangay(
  token,
  setBarangay,
  setBarangayMemberList,
  redirect,
  history,
  currentUser
) {
  console.log(currentUser?.email);
  const register = {
    uuid: token,
    email: currentUser?.email,
  };
  console.log(register);
  // before adding add JWT here later

  const querylist = axios
    .post("http://localhost:5000/auth/register", register)
    .then((res) => {
      return res.data;
    });
  if (!querylist) {
    console.log("true");
    console.log(querylist);
    localStorage.setItem(AUTH_BARANGAY_LIST, null);
    localStorage.setItem(AUTH_BARANGAY, null);
    setBarangayMemberList(null);
    setBarangay(null);
    return history.push(redirect);
  } else {
    localStorage.setItem(AUTH_BARANGAY_LIST, null);
    localStorage.setItem(AUTH_BARANGAY, null);
    setBarangayMemberList(null);
    setBarangay(null);
    return history.push(PRE_PREFIX_PATH);
  }
}
