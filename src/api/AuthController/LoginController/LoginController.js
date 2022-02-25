import {
  AUTH_BARANGAY,
  AUTH_BARANGAY_LIST,
  ACCESS_TOKEN,
  SESSION_TOKEN,
  PROFILE_URL,
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
  signOut,
  setIsLoading
) {
  let role_id, barangay_id;
  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);
  const data = {
    auth_id: token,
    email: currentUser?.email,
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
  const login = {
    auth_id: token,
    email: currentUser?.email,
    profile_url: currentUser?.photoURL,
    user: currentUser?.displayName,
  };
  axios
    .post("/api/auth/login/" + token, login, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data);
      localStorage.setItem(SESSION_TOKEN, res.data);
      setIsLoading(false);
      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);

      let response = jwt_decode(res.data);
      localStorage.setItem(
        PROFILE_URL,
        JSON.stringify({
          profile_data: currentUser?.photoURL,
          profile_color: response.profileLogo,
        })
      );
      if (response.barangays[0] && response.members[0]) {
        if (response.barangays[0].length > 0) {
          response.barangays[0].map(
            (barangay) => (barangay_id = barangay.barangay_id)
          );

          localStorage.setItem(AUTH_BARANGAY, barangay_id);
          setBarangay(barangay_id);
          console.log(response.barangays[0]);
          response.members[0].map(
            (member) => (role_id = member.barangay_member_id)
          );

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
    });
}
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };

  xhr.open("GET", url);
  xhr.responseType = "blob";
  // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  // xhr.setRequestHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  xhr.send();
}
