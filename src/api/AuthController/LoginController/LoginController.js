import {
  AUTH_BARANGAY,
  AUTH_BARANGAY_LIST,
  ACCESS_TOKEN,
} from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

export async function loginBarangay(
  token,
  setBarangayMemberList,
  setBarangay,
  redirect,
  history,
  currentUser,
  generateToken,
  signOut
) {
  let role_id, barangay_id;

  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);
  const data = {
    auth_id: token,
    iat: unix,
    exp: unix + 60,
  };
  const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
  const header = {
    headers: {
      authorization: `Bearer ${jwt}`,
      "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy":
        " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
    },
  };

  await axios
    .get("/api/auth/login/" + token, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data);
      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);
      let response = jwt_decode(res.data);
      console.log(response);
      if (response.barangays[0] && response.members[0]) {
        if (response.barangays[0].length > 0) {
          // response.barangays.map((barangay) => {
          //   console.log(barangay);
          //   return (
          //     localStorage.setItem(AUTH_BARANGAY, barangay),
          //     setBarangay(barangay)
          //   );
          // });
          // localStorage.setItem(
          //   AUTH_BARANGAY,
          //   response.barangays[0].barangay_id
          // );

          // response.barangays[0].map((barangay) => {
          //   console.log(barangay);
          //   return (
          //     localStorage.setItem(AUTH_BARANGAY, barangay.barangay_id),
          //     setBarangay(barangay.barangay_id)
          //   );
          // });

          response.barangays[0].map((barangay) => (barangay_id = barangay));

          localStorage.setItem(AUTH_BARANGAY, barangay_id);
          setBarangay(barangay_id);
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
      signOut();
      console.log(error);
      // const register = {
      //   uuid: token,
      //   email: currentUser?.email,
      // };
      // // before adding add JWT here later
      // const querylist = await axios
      //   .post("/api/auth/register", register)
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // if (!querylist) {
      //   console.log("true");
      //   console.log(querylist);
      //   localStorage.setItem(AUTH_BARANGAY_LIST, null);
      //   localStorage.setItem(AUTH_BARANGAY, null);
      //   setBarangayMemberList(null);
      //   setBarangay(null);
      //   return history.push(redirect);
      // } else {
      //   localStorage.setItem(AUTH_BARANGAY_LIST, null);
      //   localStorage.setItem(AUTH_BARANGAY, null);
      //   setBarangayMemberList(null);
      //   setBarangay(null);
      //   return history.push(PRE_PREFIX_PATH);
      // }
    });
}
