import React, { Component } from 'react'


//Icons
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';


//Hooks
import { Row, Col, Card, Form, Input, Button, Checkbox, Select, DatePicker, InputNumber, message } from "antd";
import { identity } from 'lodash';

const { Option } = Select;
const { TextArea } = Input;


export default class AdminRegisterForm1 extends Component {
    onFinish = (value) => {
        console.log(value);
        this.props.next()
   }

    render() {
        return (
            <div>

                <Form
                    layout="vertical"
                    onFinish={this.onFinish}>
                        

                    <Card className="sign-up-card">
                        <div style={{ textAlign: "center", margin: "auto 15%" }}>
                            <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Create Account</h1>
                            <p>Fill up the information that you will use to login to your account.</p>
                        </div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Enter username!' }]}
                            label="Username:"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Enter password!' }]}
                            label="Password:"
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm-password"
                            rules={[{ required: true, message: 'Confirm your new password!' }]}
                            label="Confirm Password:"
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item >
                            <Row justify="center" gutter={10}>
                                <Col>
                                    <Button ><FcGoogle style={{ marginRight: "10px" }} /> Sign up with Google</Button>
                                </Col>
                                <Col>
                                    <Button><FaFacebook style={{ marginRight: "10px" }} />Sign up with Facebook</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Row justify="center">
                            <Col>
                                <a href="/auth/login">
                                    Already have an account?? Back to Login
                                </a>
                            </Col>
                        </Row>

                    </Card>

                    <Button htmlType="submit" type="primary" style={{ float: "right" }}>
                        Next
                    </Button>
                </Form>

                <div>



                    {/* {this.props.current > 0 && (

                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            <AiOutlineLeft style={{ paddingTop: "4px" }} /> Previous
                        </Button>

                    )}
                    {this.props.current < steps.length - 1 && (
                        <Button htmlType="submit" type="primary" onClick={() => this.next()} style={{ float: "right" }}>
                            Next
                        </Button>
                    )}
                    {this.props.current === steps.length - 1 && (
                        <Button htmlType="submit" type="primary" onClick={() => message.success('Processing complete!')} style={{ float: "right" }}>
                            Done
                        </Button>
                    )} */}
                </div>
            </div>
        )
    }
}
