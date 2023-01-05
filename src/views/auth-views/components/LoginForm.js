import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert, Checkbox, Row } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import Loading from "components/shared-components/Loading";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { loginOrganization } from "api/AuthController/LoginController/LoginController";
import platform from "platform";
import axios from "axios";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
} from "redux/actions/Auth";

export const LoginForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);

  const {
    setOrganizationMemberList,
    setOrganization,
    currentUser,
    generateToken,
    setPhoto,
  } = useAuth();
  let history = useHistory();
  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    signInWithGoogle,
    signInWithFacebook,
    extra,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
    allowRedirect,
    signOut,
  } = props;

  const initialCredential = {
    email: "testuser@gmail.com",
    password: "123456",
  };

  async function onLogin(values) {
    showLoading();
    signIn(values);
  }

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };

  useEffect(() => {
    let cancel = true;

    console.log(showMessage);
    if (token !== null) {
      // getOrganization(token);

      setIsLoading(true);
      if (cancel) {
        loginOrganization(
          token,
          setOrganizationMemberList,
          setOrganization,
          redirect,
          history,
          currentUser,
          generateToken,
          signOut,
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

  return (
    <>
      {isLoading ? (
        <Row
          align="middle"
          justify="center"
          className="organization-register-container"
          style={{ height: "600px" }}
        >
          
          <Loading />
        </Row>
      ) : (
        <>
          
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
            layout="vertical"
            name="login-form"
            initialValues={initialCredential}
            onFinish={onLogin}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Please enter a validate email!",
                },
              ]}
            >
              <Input prefix={<MailOutlined className="text-primary" />} />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <div
                  className={`${
                    showForgetPassword
                      ? "d-flex justify-content-between w-100 align-items-center"
                      : ""
                  }`}
                >
                  <span>Password</span>
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
              />
            </Form.Item>

            {showForgetPassword && (
              <div className="d-flex justify-content-between">
                
                <Checkbox
                  className="pb-2 mb-2 cursor-pointer font-size-sm font-weight-normal text-muted "
                  onChange={() => {}}
                >
                  Remember me
                </Checkbox>
                <div className="mt-2">
                  <span
                    onClick={() => onForgetPasswordClick}
                    className="pb-2 cursor-pointer font-size-sm font-weight-normal text-muted ant-form-item"
                  >
                    Forget Password?
                  </span>
                </div>
              </div>
            )}
            <Form.Item>
              <Button
                className="login-btn"
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
            {otherSignIn ? renderOtherSignIn : null}
            {extra}
          </Form>
        </>
      )}
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: true,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect, signOut } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  signOut,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
