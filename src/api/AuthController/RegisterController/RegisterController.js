import {
  AUTH_ORGANIZATION,
  AUTH_ORGANIZATION_LIST,
  ACCESS_TOKEN,
  SESSION_TOKEN,
  CODE_TOKEN,
  PROFILE_URL,
} from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import publicIp from "react-public-ip";

export async function registerOrganization(
  token,
  setOrganization,
  setOrganizationMemberList,
  redirect,
  history,
  currentUser,
  generateToken,
  setIsLoading,
  platform,
  browser,
  setPhoto
) {
  let codeData = "";
  let profileUrl = "";
  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);
  const ipv4 = (await publicIp.v4()) || "";

  const data = {
    ipv4: ipv4,
    auth_id: token,
    email: currentUser?.email,
    platform: platform,
    browser: browser,
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
  if (
    localStorage.getItem(CODE_TOKEN) == null ||
    localStorage.getItem(CODE_TOKEN) == "null" ||
    localStorage.getItem(CODE_TOKEN) == "undefined" ||
    localStorage.getItem(CODE_TOKEN) == undefined
  ) {
    codeData = "";
  } else {
    codeData = localStorage.getItem(CODE_TOKEN);
  }

  // getBase64FromUrl(currentUser?.photoURL).then((dataUrl) => {
  // console.log(currentUser?.photoURL, "photo");
  // console.log(currentUser?.displayName, "displayname");
  // before adding add JWT here later

  const register = {
    uuid: token,
    email: currentUser?.email,
    code: codeData,
    user: currentUser?.displayName,
    profile_url: currentUser?.photoURL,
  };
  const querylist = axios
    .post("/api/auth/register", register, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(SESSION_TOKEN, res.data.accessToken);
      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);
      profileUrl = res.data.profileUrl;
      return jwt_decode(res.data.accessToken);
    });
  localStorage.removeItem(CODE_TOKEN);
  localStorage.removeItem(PROFILE_URL);
  if (!querylist) {
    localStorage.setItem(AUTH_ORGANIZATION_LIST, null);
    localStorage.setItem(AUTH_ORGANIZATION, null);
    setOrganizationMemberList(null);
    setOrganization(null);
    // user.updateProfile({
    //   displayName: firstNameRef.current.value + " " + lastNameRef.current.value,
    //   // photoURL: "https://example.com/jane-q-user/profile.jpg",
    // });
    setIsLoading();
    return history.push(redirect);
  } else {
    let role_id, organization_id;
    querylist.then(
      (result) => {
        console.log(result);
        localStorage.setItem(
          PROFILE_URL,
          JSON.stringify({
            profile_data: profileUrl,
            profile_color: result.profileLogo,
          })
        );
        setPhoto({
          profile_data: profileUrl,
          profile_color: result.profileLogo,
        });
        if (result.organizations[0]) {
          result.organizations[0].map(
            (organization) => (organization_id = organization.organization_id)
          );
          localStorage.setItem(AUTH_ORGANIZATION, organization_id);
          setOrganization(organization_id);
          result.members[0].map(
            (member) => (role_id = member.organization_member_id)
          );
          localStorage.setItem(AUTH_ORGANIZATION_LIST, role_id);
          setOrganizationMemberList(role_id);
          return history.push(redirect);
        } else {
          localStorage.setItem(AUTH_ORGANIZATION_LIST, null);
          localStorage.setItem(AUTH_ORGANIZATION, null);
          setOrganizationMemberList(null);
          setOrganization(null);
          return history.push(PRE_PREFIX_PATH);
        }
      },
      function (error) {
        console.log("error" + error);
      }
    );
  }

  // });
}

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
