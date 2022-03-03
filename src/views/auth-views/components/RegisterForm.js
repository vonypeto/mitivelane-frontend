import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, Divider, Row } from "antd";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { registerBarangay } from "api/AuthController/RegisterController/RegisterController";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import Loading from "components/shared-components/Loading";
import CustomIcon from "components/util-components/CustomIcon";
import { CODE_TOKEN } from "redux/constants/Auth";
import platform from "platform";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";

const rules = {
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    setBarangay,
    setBarangayMemberList,
    currentUser,
    generateToken,
    setPhoto,
  } = useAuth();
  const codeRef = useRef();
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    otherSignIn,
    signInWithGoogle,
    signInWithFacebook,
    extra,
  } = props;

  const [form] = Form.useForm();
  let history = useHistory();
  const onGoogleLogin = () => {
    if (codeRef.current.value)
      localStorage.setItem(CODE_TOKEN, String(codeRef.current.value));
    else localStorage.setItem(CODE_TOKEN, null);
    setIsLoading(true);

    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };
  const onSignUp = (values) => {
    localStorage.setItem(CODE_TOKEN, String(values.code));
    // const datas = values.code;
    form.validateFields().then((values) => {
      showLoading();

      signUp(values);
    });
  };

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          or connect with
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button>
        <Button
          onClick={() => onFacebookLogin()}
          icon={<CustomIcon svg={FacebookSVG} />}
          disabled={loading}
        >
          Facebook
        </Button>
      </div>
    </div>
  );
  useEffect(() => {
    // console.log("token", token, "allowredirect", allowRedirect);
    let cancel = true;
    if (token !== null) {
      if (cancel) {
        setIsLoading(true);
        cancel = false;
        registerBarangay(
          token,
          setBarangay,
          setBarangayMemberList,
          redirect,
          history,
          currentUser,
          generateToken,
          setIsLoading,
          platform.os.family,
          platform.name,
          setPhoto
        );
      }
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
    return () => {
      cancel = false;
    };
  }, []);

  return (
    <>
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
        <>
          {" "}
          <motion.div
            initial={{ opacity: 0, marginBottom: 0 }}
            animate={{
              opacity: showMessage ? 1 : 0,
              marginBottom: showMessage ? 20 : 0,
            }}
          >
            <Alert type="error" showIcon message={message}></Alert>
          </motion.div>
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            onFinish={onSignUp}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={rules.email}
              hasFeedback
            >
              <Input prefix={<MailOutlined className="text-primary" />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={rules.password}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="ConfirmPassword"
              rules={rules.confirm}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
              />
            </Form.Item>
            <Form.Item
              name="code"
              label="Invitation "
              tooltip="Leave blank if you don't have a code"
              hasFeedback
            >
              <Input
                placeholder="XXXX-XXXX-XXXX"
                prefix={<NumberOutlined className="text-primary" />}
                ref={codeRef}
                disabled
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign Up
              </Button>
            </Form.Item>{" "}
            {otherSignIn ? renderOtherSignIn : null}
            {extra}
          </Form>
        </>
      )}
    </>
  );
};
RegisterForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
RegisterForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: true,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
