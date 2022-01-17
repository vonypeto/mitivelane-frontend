import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, Divider } from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { registerBarangay } from "api/AuthController/RegisterController/RegisterController";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
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
  const { setBarangay, setBarangayMemberList, currentUser } = useAuth();
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
    allowRedirect,
    otherSignIn,
    showForgetPassword,
    onForgetPasswordClick,
    signInWithGoogle,
    signInWithFacebook,
    extra,
    signIn,
  } = props;

  const [form] = Form.useForm();
  let history = useHistory();
  const onGoogleLogin = () => {
    if (codeRef.current.value)
      localStorage.setItem("code", String(codeRef.current.value));
    else localStorage.setItem("code", null);

    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };
  const onSignUp = (values) => {
    console.log(values);
    localStorage.setItem("code", String(values.code));
    const datas = values.code;
    console.log("localstorage", datas);
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
    console.log("token", token, "allowredirect", allowRedirect);
    let cancel = false;
    if (token !== null) {
      console.log("test");
      console.log(localStorage.getItem("code"));
      if (cancel) return;
      registerBarangay(
        token,
        setBarangay,
        setBarangayMemberList,
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
    return () => {
      cancel = true;
    };
  });

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
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="ConfirmPassword"
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item name="code" label="Invitation" hasFeedback>
          <Input
            placeholder="XXXX-XXXX-XXXX"
            prefix={<NumberOutlined className="text-primary" />}
            ref={codeRef}
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
