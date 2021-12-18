import React, { useEffect } from "react";
import "./LoginForm.css";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { loginBarangay } from "api/AuthController/LoginController/LoginController";
export const LoginForm = (props) => {
  const { setBarangayMemberList, setBarangay, currentUser } = useAuth();
  let history = useHistory();
  console.log(props);
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
  } = props;

  const initialCredential = {
    email: "user1@themenate.net",
    password: "2005ipo",
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
    if (token !== null && allowRedirect) {
      // getBarangay(token);
      loginBarangay(
        token,
        setBarangayMemberList,
        setBarangay,
        redirect,
        history,
        currentUser
      );
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

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
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        {showForgetPassword && (
          <span
            onClick={() => onForgetPasswordClick}
            className="pb-2 cursor-pointer font-size-sm font-weight-normal text-muted ant-form-item"
          >
            Forget Password?
          </span>
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
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
