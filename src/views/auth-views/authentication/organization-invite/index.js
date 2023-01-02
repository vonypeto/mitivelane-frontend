import React, { useEffect } from "react";
import { Row, Col, message } from "antd";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom"
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

const index = ({ match }) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  const _id = match.params._id
  const history = useHistory()

  const authToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    verifyRequest()
    console.log(currentUser)

  }, [])

  // malibag pa code, linisin ko pa - Rojhon Pogi
  const verifyRequest = () => {
    try {
      axios
        .post(
          "/api/organization_setting/verify-request/", { _id, uuid: authToken },
          generateToken()[1]
        )
        .then((response) => {
          if (response.data == "Condition1") {
            localStorage.clear()
            history.push("/auth/register")
          }
          else if (response.data == "Condition2") {
            localStorage.clear()
            history.push("/auth/login")

          } else if (response.data == "Condition3") {
            acceptRequest({ _id })
          }
          else if (response.data == "Error") {
            message.error("Expired")
            history.push("/")
          }
          console.log("Verify request ", response.data);
        })
        .catch(() => {
          message.error("Could not fetch the data in the server!");
        });

    } catch (error) {
      const data = {
        req_id: _id,
        name: "Test Name",
        iat: "13456576"
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

      axios
        .post(
          "/api/organization_setting/verify-request/", { _id, uuid: authToken },
          header
        )
        .then((response) => {
          if (response.data == "Condition1") {
            localStorage.clear()
            history.push("/auth/register")
          }
          else if (response.data == "Condition2") {
            localStorage.clear() 
            history.push("/auth/login")

          } else if (response.data == "Condition3") {
            acceptRequest({ _id })
          }
          else if (response.data == "Error") {
            message.error("Expired")
            history.push("/")
          }
          console.log("Verify request ", response.data);
        })
        .catch(() => {
          message.error("Could not fetch the data in the server!");
        });

    }
  }

  const acceptRequest = (values) => {
    axios
      .post(
        "/api/organization_setting/accept-request/", values,
        generateToken()[1]
      )
      .then((response) => {
        if (response.data == "Success") {
          message.success("Join Organization")
          history.push("/")
        }
        else if (response.data == "Joined") {
          message.success("Already Joined")
          history.push("/")
        }
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  }

  return (
    <div >
      <h1>Verifying...</h1>
    </div>
  );
};

export default index;

