import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
    code: localStorage.getItem("code"),
  };

  console.log(localStorage.getItem("code"));
  // before adding add JWT here later

  const querylist = axios.post("/auth/register", register).then((res) => {
    return jwt_decode(res.data);
  });
  localStorage.removeItem("code");
  console.log(querylist);
  if (!querylist) {
    querylist.then(
      (result) => {
        console.log(result);
      },
      function (error) {
        this.setState({ name: error });
      }
    );
    console.log("true");
    console.log(querylist);
    localStorage.setItem(AUTH_BARANGAY_LIST, null);
    localStorage.setItem(AUTH_BARANGAY, null);
    setBarangayMemberList(null);
    setBarangay(null);
    // user.updateProfile({
    //   displayName: firstNameRef.current.value + " " + lastNameRef.current.value,
    //   // photoURL: "https://example.com/jane-q-user/profile.jpg",
    // });
    return history.push(redirect);
  } else {
    querylist.then(
      (result) => {
        console.log();
        console.log(result[0]?.user[0]?.email);
        if (result.user[0]) {
          console.log("true");
          localStorage.setItem(
            AUTH_BARANGAY_LIST,
            result?.user[0]?.barangay_member_id
          );
          localStorage.setItem(AUTH_BARANGAY, result?.user[0]?.barangay_id);
          setBarangayMemberList(result?.user[0]?.barangay_member_id);
          setBarangay(result?.user[0]?.barangay_id);
          return history.push(redirect);
        } else {
          console.log("false");
          console.log(querylist);
          localStorage.setItem(AUTH_BARANGAY_LIST, null);
          localStorage.setItem(AUTH_BARANGAY, null);
          setBarangayMemberList(null);
          setBarangay(null);
          return history.push(PRE_PREFIX_PATH);
        }
      },
      function (error) {
        console.log("error" + error);
      }
    );
  }
}
