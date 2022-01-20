import React, { useEffect, useState } from "react";
import "./index.css";

import UserInfoForm from "views/pre-views/components/barangay-register-form/UserInfoForm";
import BarangayInfoForm from "views/pre-views/components/barangay-register-form/BarangayInfoForm";
import { createBarangay } from "api/AuthController/PreRegisterController/PreRegisterController";
import { Row, Col, Card, Form, Button, Input } from "antd";
import axios from "axios";
import {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import { useAuth } from "contexts/AuthContext";
import { connect } from "react-redux";
import { HeaderNavRegister } from "components/layout-components/HeaderNavRegister";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

const BarangayRegister = (props) => {
  const {
    currentUser,
    setBarangay,
    setBarangayMemberList,
    authorization,
    authorizationConfig,
  } = useAuth();
  const [firstTime, setFirstTime] = useState(true);
  const { auth } = props;
  const user_id = auth.token;
  const formRef = React.createRef();
  let history = useHistory();
  useEffect(() => {
    let cancel = true;
    //convert this to a new component later to the api folder
    axios
      .get("/api/app/users/" + user_id)
      .then((response) => {
        if (response.data[0].barangays[0] && response.data[0].members[0]) {
          if (response.data.length > 0) {
            console.log(response.data);
            if (cancel) {
              setFirstTime(response.data.first_time);
              console.log(firstTime);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      cancel = false;
    };
    // return () => {
    //   cleanup
    // }
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    createBarangay(
      history,
      currentUser,
      values,
      user_id,
      setBarangay,
      setBarangayMemberList,
      firstTime
    );
  }; // test
  const onSubmit = async (e) => {
    e.preventDefault();
    //Starting Fetch Storage
    let response = jwt_decode(localStorage.getItem("access_token"));
    console.log(response.auth_id);
    const date = new Date().getTime() / 1000;
    console.log(date);
    const unix = Math.round(date);
    const data = {
      auth_id: response.auth_id,
      iat: unix,
      exp: unix + 5,
    };
    //End Fetch Storage
    const data2 = {
      uuid: localStorage.getItem("auth_token"),
      token: localStorage.getItem("access_token"),
    };
    console.log(process.env.REACT_APP_ACCESS_TOKEN_SECRET);

    const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
    console.log(jwt);
    authorizationConfig(jwt);
    const header = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.post("/api/refresh", data2, header).then((res) => {
      console.log(res);
      localStorage.setItem("access_token", res.data.accessToken);
    });
  };
  const onAction = async (e) => {
    e.preventDefault();
    // let response = jwt_decode(localStorage.getItem("access_token"));
    // console.log(response.auth_id);
    // const date = new Date().getTime() / 1000;
    // console.log(date);
    // const unix = Math.round(date);
    // const data = {
    //   auth_id: response.auth_id,
    //   iat: unix,
    // };
    // const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
    // //24 hour 86400
    // authorizationConfig(jwt);
    // const header = {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // };

    await axios
      .get("/api/posts", authorization)
      .then((res) => {
        console.log(res.status);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div className=" w-100">
      <HeaderNavRegister />
      <Row
        align="middle"
        justify="center"
        className="barangay-register-container"
      >
        <Col>
          {/* test
          <form onSubmit={onSubmit}>
            <button type="submit">refresh</button>
          </form>
          <form onSubmit={onAction}>
            <button type="submit">action</button>
          </form> */}
          <Form layout="vertical" ref={formRef} onFinish={handleSubmit}>
            {firstTime ? (
              <Card className="barangay-register-card">
                <div style={{ textAlign: "center", margin: "auto 15%" }}>
                  <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>
                    Personal Info
                  </h1>
                  <p>
                    We need your personal data to help others identify you and
                    can be used to make filling up forms in the future faster.
                  </p>
                </div>
                <UserInfoForm />
              </Card>
            ) : null}

            <Card className="barangay-register-card">
              <div style={{ textAlign: "center", margin: "auto 15%" }}>
                <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>
                  Register Barangay
                </h1>
                <p>
                  Enter the data accordingly to your barangay. You can always
                  update your barnagay's data anytime.
                </p>
              </div>

              <BarangayInfoForm />
            </Card>

            <Button htmlType="submit" type="primary" style={{ float: "right" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <p style={{ textAlign: "center", paddingBottom: "20px" }}>
        By clicking "Submit" you agree with the <a>Terms & Condition</a> and{" "}
        <a>Privacy Terms</a>
      </p>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
};
export default connect(mapStateToProps, mapDispatchToProps)(BarangayRegister);
