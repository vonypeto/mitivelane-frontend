import React, { useEffect, useState } from "react";
import "./index.css";

import UserInfoForm from "views/pre-views/components/barangay-register-form/UserInfoForm";
import BarangayInfoForm from "views/pre-views/components/barangay-register-form/BarangayInfoForm";
import { createBarangay } from "api/AuthController/PreRegisterController/PreRegisterController";
import { Spin } from "antd";
import Loading from "components/shared-components/Loading";
import { Row, Col, Card, Form, Button } from "antd";
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
    authorizationConfig,
    generateToken,
  } = useAuth();

  const [firstTime, setFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState([]);
  const { auth } = props;
  const user_id = auth.token;
  const formRef = React.createRef();
  let history = useHistory();
  // const getData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   console.log(res.data);
  // };
  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);

  // const header = () => {
  //   let response = jwt_decode(localStorage.getItem("access_token"));
  //   const date = new Date().getTime() / 1000;
  //   const unix = Math.round(date);
  //   const data = {
  //     auth_id: response.auth_id,
  //     iat: unix,
  //     exp: unix + 60,
  //   };
  //   const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
  //   const header = {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //       "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
  //       "X-XSS-Protection": "1; mode=block",
  //       "Content-Security-Policy":
  //         " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
  //     },
  //   };
  //   return header;
  // };
  useEffect(() => {
    let APIFetch = true;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    //convert this to a new component later to the api folder

    axios
      .get("/api/pre/users/" + user_id, generateToken()[1], {
        cancelToken: source.token,
      })
      .then((response) => {
        setInitialData({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
        });
        // if (response.data[0].barangays) {
        if (APIFetch) {
          // console.log(response.data[0].first_time);
          setIsLoading(!isLoading);
          if (response.data.length > 0) {
            setFirstTime(response.data[0].first_time);

            // }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (axios.isCancel(error)) {
          console.log("successfully aborted");
        } else {
          // handle error
        }
      });

    return () => {
      APIFetch = false;
      source.cancel();
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
      firstTime,
      generateToken
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

    const header = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
        "X-XSS-Protection": "1; mode=block",
      },
    };
    await axios.post("/api/refresh", data2, header).then((res) => {
      console.log(res);
      localStorage.setItem("access_token", res.data.accessToken);
      authorizationConfig(res.data.accessToken);
    });
  };
  const onAction = async () => {
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
    let testToken = generateToken();
    // setTimeout(async () => {
    await axios
      .get("/api/posts", testToken[1])
      .then((res) => {
        console.log(res.status);
      })
      .catch((e) => {
        console.log(e.message);
      });
    // }, 3000);

    console.log(testToken[1]);
  };
  return (
    <div className=" w-100">
      <HeaderNavRegister />
      {isLoading ? (
        <Row
          align="middle"
          justify="center"
          className="barangay-register-container"
          style={{ height: "600px" }}
        >
          {" "}
          <Loading />
        </Row>
      ) : (
        <Row
          align="middle"
          justify="center"
          className="barangay-register-container"
        >
          <Col align="middle" justify="center">
            {/* test
            <form onSubmit={onSubmit}>
              <button type="submit">refresh if remember</button>
            </form> */}
            {/* <Form onFinish={onAction}>
              <Button htmlType="submit">action</Button>
            </Form> */}
            <Form
              layout="vertical"
              initialValues={initialData}
              ref={formRef}
              onFinish={handleSubmit}
            >
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

              <Button
                htmlType="submit"
                type="primary"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
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
