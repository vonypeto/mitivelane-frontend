import {
  AUTH_BARANGAY,
  AUTH_BARANGAY_LIST,
  ACCESS_TOKEN,
  SESSION_TOKEN,
} from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

export async function registerBarangay(
  token,
  setBarangay,
  setBarangayMemberList,
  redirect,
  history,
  currentUser,
  generateToken
) {
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
  let code_data = "";
  if (
    localStorage.getItem("code") == null ||
    localStorage.getItem("code") == "null" ||
    localStorage.getItem("code") == "undefined" ||
    localStorage.getItem("code") == undefined
  ) {
    code_data = "";
  } else {
    code_data = localStorage.getItem("code");
  }
  console.log(code_data);
  const register = {
    uuid: token,
    email: currentUser?.email,
    code: code_data,
  };

  console.log(register);
  // before adding add JWT here later

  const querylist = axios
    .post("/api/auth/register", register, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data);
      localStorage.setItem(SESSION_TOKEN, res.data);

      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);
      return jwt_decode(res.data);
    });
  localStorage.removeItem("code");
  console.log(querylist);
  if (!querylist) {
    // querylist.then(
    //   (result) => {
    //     console.log(result);
    //   },
    //   function (error) {
    //     this.setState({ name: error });
    //   }
    // );
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
    let role_id, barangay_id;
    querylist.then(
      (result) => {
        console.log();
        console.log(result);
        if (result.barangays[0]) {
          console.log("true");
          // localStorage.setItem(
          //   AUTH_BARANGAY_LIST,
          //   result?.members[0]?.barangay_member_id
          // );
          // localStorage.setItem(
          //   AUTH_BARANGAY,
          //   result?.barangays[0]?.barangay_id
          // );
          // setBarangayMemberList(result?.members[0]?.barangay_member_id);
          // setBarangay(result?.barangays[0]?.barangay_id);

          result.barangays[0].map(
            (barangay) => (barangay_id = barangay.barangay_id)
          );

          localStorage.setItem(AUTH_BARANGAY, barangay_id);
          setBarangay(barangay_id);
          console.log(result.barangays[0]);
          result.members[0].map(
            (member) => (role_id = member.barangay_member_id)
          );

          localStorage.setItem(AUTH_BARANGAY_LIST, role_id);
          setBarangayMemberList(role_id);

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
