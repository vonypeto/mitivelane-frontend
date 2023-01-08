import {
  AUTH_ORGANIZATION,
  AUTH_ORGANIZATION_LIST,
  ACCESS_TOKEN,
  SESSION_TOKEN,
  PROFILE_URL,
} from "redux/constants/Auth";
import { PRE_PREFIX_PATH } from "configs/AppConfig";
import axios from "axios";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import publicIp from "react-public-ip";

export async function loginOrganization(
  token,
  setOrganizationMemberList,
  setOrganization,
  redirect,
  history,
  currentUser,
  generateToken,
  signOut,
  setIsLoading,
  platform,
  browser,
  setPhoto
) {
  const ipv4 = (await publicIp.v4()) || "";

  let role_id, organization_id;
  const date = new Date().getTime() / 1000;
  const unix = Math.round(date);
  const data = {
    ipv4: ipv4,
    auth_id: token,
    platform: platform,
    email: currentUser?.email,
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

  const login = {
    auth_id: token,
    email: currentUser?.email,
    profile_url: currentUser?.photoURL,
    user: currentUser?.displayName,
  };
  axios
    .post("/api/auth/login/" + token, login, header)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(SESSION_TOKEN, res.data.accessToken);
      setIsLoading(false);
      let tmp = generateToken();
      localStorage.setItem(ACCESS_TOKEN, tmp[0]);
      let response = jwt_decode(res.data.accessToken);
      localStorage.setItem(
        PROFILE_URL,
        JSON.stringify({
          profile_data: res.data?.profileUrl,
          profile_color: response.profileLogo,
        })
      );
      setPhoto({
        profile_data: res.data?.profileUrl,
        profile_color: response.profileLogo,
      });
      if (response.organizations[0] && response.members[0]) {
        if (response.organizations[0].length > 0) {
          response.organizations[0].map(
            (organization) => (organization_id = organization.organization_id)
          );
          localStorage.setItem(AUTH_ORGANIZATION, organization_id);
          setOrganization(organization_id);
          response.members[0].map(
            (member) => (role_id = member.organization_member_id)
          );
          localStorage.setItem(AUTH_ORGANIZATION_LIST, role_id);
          setOrganizationMemberList(role_id);
          console.log(redirect);
          return history.push(redirect);
        }
      } else {
        localStorage.setItem(AUTH_ORGANIZATION_LIST, null);
        localStorage.setItem(AUTH_ORGANIZATION, null);
        setOrganizationMemberList(null);
        setOrganization(null);
        return history.push(PRE_PREFIX_PATH);
      }
    })
    .catch(async (error) => {
      signOut();
      console.log(error);
    });

  // const geo = geoip.lookup(ipv4 + 1);
  // console.log(geo);
}
