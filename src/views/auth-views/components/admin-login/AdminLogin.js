import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Row, Col, Checkbox } from "antd";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInWithGoogle, 
	signInWithFacebook 
} from 'redux/actions/Auth';

import { useHistory } from "react-router-dom";

import './AdminLogin.css';

export const AdminLogin = props => {

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
      } = props;

    const initialCredential = {
        email: 'user1@themenate.net',
        password: '2005ipo'
    }

    const onLogin = values => {
        console.log(allowRedirect)
        showLoading()
        signIn(values);
    };

    useEffect(() => {
        console.log(allowRedirect)
		if (token !== null  && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});

    return (
        <div>
            <div style={{ alignSelf: 'center' }}>
                <h1 className="form-title">Login now</h1>
                
                <Form
                    layout="vertical"
                    name="login-form"
                    initialValues={initialCredential}
                    onFinish={onLogin}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item >
                        <Button className="login-btn" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>

                    <Form.Item name="remember" wrapperCol={{ span: 24 }}>
                        <Row justify="space-between">

                            <Col><Checkbox>Remember me</Checkbox></Col>
                            <Col> <a href="url">Forgot Password?</a></Col>
                        </Row>
                    </Form.Item>

                    <Form.Item >
                        <Row justify="center" gutter={10}>
                            <Col>
                                <Button ><FcGoogle style={{ marginRight: "10px" }} /> Sign in with Google</Button>
                            </Col>
                            <Col>
                                <Button><FaFacebook style={{ marginRight: "10px" }} />Sign in with Facebook</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Row justify="center">
                        <Col>
                            <a href="/auth/admin-register">Don't have an account yet? Sign up now.</a>
                        </Col>
                    </Row>

                </Form>

            </div>

        </div >
    )
}

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
