import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";

export async function loginBarangay(
  token,
  setBarangayMemberList,
  setBarangay,
  redirect,
  history,
  currentUser
) {
  let role_id;

  axios
    .get(" http://localhost:5000/app/users/" + token)
    .then((response) => {
      if (response.data[0].barangays[0] && response.data[0].members[0]) {
        if (response.data.length > 0) {
          console.log(response.data);
          response.data[0].barangays[0].map((barangay) => {
            localStorage.setItem(AUTH_BARANGAY, barangay._id);
            setBarangay(barangay._id);
          });
          response.data[0].members[0].map((member) => {
            role_id = member;
          });

          localStorage.setItem(AUTH_BARANGAY_LIST, role_id);
          setBarangayMemberList(role_id);
          return history.push(redirect);
        }
      } else {
        localStorage.setItem(AUTH_BARANGAY_LIST, null);
        localStorage.setItem(AUTH_BARANGAY, null);
        setBarangayMemberList(null);
        setBarangay(null);
        return history.push(PRE_PREFIX_PATH);
      }
    })
    .catch((error) => {
      console.log(error);
      const register = {
        uuid: token,
        email: currentUser?.email,
      };
      // before adding add JWT here later
      const querylist = axios
        .post("http://localhost:5000/auth/register", register)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
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
    });
}
