import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { registerBarangay } from "api/AuthController/RegisterController/RegisterController";

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
  } = props;
  const [form] = Form.useForm();
  let history = useHistory();

  const onSignUp = (values) => {
    console.log(values);
    form.validateFields().then((values) => {
      showLoading();
      signUp(values);
    });
  };

  useEffect(() => {
    console.log("token", token, "allowredirect", allowRedirect);
    console.log(form);
    // async function getBarangay(token) {
    //   // Make the initial query
    //   const tmp = token;
    //   const query = await db
    //     .collection("barangay_members")
    //     .where("auth_id", "==", tmp)
    //     .get();

    //   if (!query.empty) {
    //     const snapshot = query.docs[0];
    //     const data = snapshot.data();
    //     console.log("Doc", snapshot.id);
    //     localStorage.setItem(AUTH_BARANGAY_LIST, snapshot.id);

    //     localStorage.setItem(AUTH_BARANGAY, data.barangay_id);
    //     console.log(localStorage.getItem("auth_barangay"));

    //     setBarangayMemberList(snapshot.id);
    //     setBarangay(data.barangay_id);

    //     return history.push(redirect);
    //   } else {
    //     console.log("Doc");
    //     localStorage.setItem(AUTH_BARANGAY_LIST, null);
    //     localStorage.setItem(AUTH_BARANGAY, null);

    //     setBarangayMemberList(null);
    //     setBarangay(null);

    //     return history.push(PRE_PREFIX_PATH);
    //   }
    // }
    if (token !== null) {
      console.log("test");
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
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
