import React, { useEffect } from "react";
import { message } from "antd";
import { AUTH_TOKEN, ORGANIZATION_REQUEST_ID } from "redux/constants/Auth";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom"
import sign from "jwt-encode";
import { verifyRequest } from "api/AppController/OrganizationController/OrganizationSettingController";

const index = ({ match }) => {
  const { generateToken } = useAuth();
  const _id = match.params._id
  const history = useHistory()

  const authToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    handleVerifyRequest()
  }, [])

  const handleVerifyRequest = () => {
    try {
      var token = ""

      if (authToken == null) {
        const data = {
          req_id: _id,
          name: "Test Name",
          iat: "13456576"
        };
        const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
        token = {
          headers: {
            authorization: `Bearer ${jwt}`,
            "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
            "X-XSS-Protection": "1; mode=block",
            "Content-Security-Policy":
              " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
          },
        };
      } else {
        token = generateToken()[1]
      }

      (async () => {
        const response = await verifyRequest(_id, authToken, token);
        if (response == "Condition1") {
          localStorage.clear()
          localStorage.setItem(ORGANIZATION_REQUEST_ID, _id)
          history.push("/auth/register")
        }
        else if (response == "Condition2") {
          localStorage.clear()
          localStorage.setItem(ORGANIZATION_REQUEST_ID, _id)
          history.push("/auth/login")

        } else if (response == "Condition3") {
          localStorage.setItem(ORGANIZATION_REQUEST_ID, _id)
          history.push("/")
        }
        else if (response == "Error") {
          message.error("Invitation is already Expired")
          history.push("/")
        }
      })();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <h1>Verifying...</h1>
    </div>
  );
};

export default index;