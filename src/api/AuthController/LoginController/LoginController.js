import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";

export async function loginBarangay(
  token,
  setBarangayMemberList,
  setBarangay,
  redirect,
  history,
  currentUser
) {
  let role_id;

  await axios
    .get("/auth/login/" + token)
    .then((res) => {
      console.log(jwt_decode(res.data));
      let response = jwt_decode(res.data);
      console.log(response);
      if (response.barangays[0] && response.members[0]) {
        if (response.barangays[0].length > 0) {
          response.barangays.map((barangay) => {
            console.log(barangay);
            return (
              localStorage.setItem(AUTH_BARANGAY, barangay[0].barangay_id),
              setBarangay(barangay._id)
            );
          });
          localStorage.setItem(
            AUTH_BARANGAY,
            response.barangays[0].barangay_id
          );

          response.barangays[0].map((barangay) => {
            console.log(barangay);
            return (
              localStorage.setItem(AUTH_BARANGAY, barangay.barangay_id),
              setBarangay(barangay.barangay_id)
            );
          });
          console.log(response.barangays[0]);
          response.members[0].map((member) => (role_id = member));

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
    .catch(async (error) => {
      console.log(error);
      const register = {
        uuid: token,
        email: currentUser?.email,
      };
      // before adding add JWT here later
      const querylist = await axios
        .post("/auth/register", register)
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
