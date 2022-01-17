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

const BarangayRegister = (props) => {
  const { currentUser, setBarangay, setBarangayMemberList } = useAuth();
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
