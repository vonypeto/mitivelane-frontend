import React from "react";
import "./index.css";

import UserInfoForm from "views/pre-views/components/barangay-register-form/UserInfoForm";
import BarangayInfoForm from "views/pre-views/components/barangay-register-form/BarangayInfoForm";
import { createBarangay } from "api/AuthController/PreRegisterController/PreRegisterController";
import { Row, Col, Card, Form, Button, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
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
  const { auth } = props;
  let history = useHistory();
  const { currentUser, setBarangay, setBarangayMemberList } = useAuth();
  const user_id = auth.token;

  const formRef = React.createRef();
  const handleSubmit = async (values) => {
    // const data = values;
    // console.log(uuidv4());
    // console.log(moment(values.birthday).format(DATE_FORMAT_YYYY_MM_DD));

    console.log(values);
    createBarangay(
      history,
      currentUser,
      values,
      user_id,
      setBarangay,
      setBarangayMemberList
    );
    //   await db
    //     .collection("barangay_list")
    //     .doc(uuid)
    //     .set({
    //       name: "Baras",
    //     })
    //     .then(() => {
    //       console.log("Document successfully written!");
    //       db.collection("barangay_members")
    //         .doc()
    //         .set({
    //           name: data.first_name,
    //           email: currentUser?.email,
    //           role: "Administrator",
    //           auth_id: user_id,
    //           barangay_id: uuid,
    //         })
    //         .catch(() => {
    //           db.collection("barangay_list")
    //             .doc(uuid)
    //             .delete()
    //             .then(() => {
    //               console.log("Document successfully deleted!");
    //             })
    //             .catch((error) => {
    //               console.error("Error removing document: ", error);
    //             });
    //         });
    //     })
    //     .catch((error) => {
    //       console.error("Error writing document: ", error);
    //     });
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
            <Card className="barangay-register-card">
              <div style={{ textAlign: "center", margin: "auto 15%" }}>
                <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>
                  Personal Info
                </h1>
                <p>
                  We need your personal data to help others identify you and can
                  be used to make filling up forms in the future faster.
                </p>
              </div>

              <UserInfoForm />
            </Card>

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
