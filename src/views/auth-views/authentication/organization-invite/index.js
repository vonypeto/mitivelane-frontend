import React, { useEffect } from "react";
import { Row, Col, message } from "antd";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom"

const index = ({ match }) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  const _id = match.params._id
  const history = useHistory()

  const authToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    verifyRequest()
    console.log(currentUser)

  }, [])

  const verifyRequest = () => {
    axios
      .post(
        "/api/organization_setting/verify-request/", { _id, uuid: authToken },
        generateToken()[1]
      )
      .then((response) => {
        if (response.data == "Condition1") {

        }
        else if (response.data == "Condition2") {

        } else if (response.data == "Condition3") {
          acceptRequest({ _id })
        }
        console.log("Verify request ", response.data);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });

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

