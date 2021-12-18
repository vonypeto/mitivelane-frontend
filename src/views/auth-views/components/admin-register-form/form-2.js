import React, { Component } from 'react'

//Icons
import { AiOutlineLeft } from "react-icons/ai"

//Hooks
import { Row, Col, Card, Form, Input, Button, Checkbox, Select, DatePicker, InputNumber } from "antd";

const { Option } = Select;
const { TextArea } = Input;


export default class AdminRegisterForm2 extends Component {

    onFinish = (value) => {
        console.log(value);
        this.props.next()
    }

    render() {
        const initialCredential = {
            gender: 'Male',
            civil_status: 'Single'
        }
        return (
            <Form
                layout="vertical"
                initialValues={initialCredential}
                onFinish={this.onFinish}
            >
                <Card className="sign-up-card">

                    <div style={{ textAlign: "center", margin: "auto 15%" }}>
                        <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Personal Info</h1>
                        <p>We need your personal data to help others identify you and can be used to make filling up forms in the future faster.</p>
                    </div>
                    <Row gutter={12}>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="first-name"
                                rules={[{ required: true, message: 'Enter your first name!' }]}
                                label="First name:"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="last-name"
                                rules={[{ required: true, message: 'Enter your last name!' }]}
                                label="Last name: "
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="middle-name"
                                rules={[{ required: true, message: 'Enter your middle name!' }]}
                                label="Middle name:"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="birthday"
                                rules={[{ required: true, message: 'Enter your birthday!' }]}
                                label="Birthday:"
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24} >
                            <Form.Item
                                className="form1-items"
                                name="gender"
                                rules={[{ required: true, message: 'Choose your gender!' }]}
                                label="Gender:"
                            >
                                <Select>
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="civil_status"
                                rules={[{ required: true, message: 'Choose your civil status!' }]}
                                label="Civil Status:"
                            >
                                <Select>
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                    <Option value="Widowed">Widowed </Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="municipality"
                                rules={[{ required: true, message: 'Need municipality!' }]}
                                label="Municipality:"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="province"
                                rules={[{ required: true, message: 'Need province!' }]}
                                label="Province: "
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="country"
                                rules={[{ required: true, message: 'Need country!' }]}
                                label="Country: "
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="mobile-number"
                                rules={[{ required: true, message: 'Need your mobile number!' }]}
                                label="Mobile number:"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="telephone-number"
                                rules={[{ required: true, message: 'telephone number!' }]}
                                label="Telephone number: "
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                            <Form.Item
                                className="form1-items"
                                name="email"
                                rules={[{ required: true, message: 'Need your email!' }]}
                                label="Email: "
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="form1-items"
                                name="address"
                                rules={[{ required: true, message: 'Enter your address!' }]}
                                label="Address:"
                            >
                                <TextArea autoSize />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Action buttons */}
                    <Button style={{ margin: '0 8px' }} onClick={() => this.props.prev()}>
                        <AiOutlineLeft style={{ paddingTop: "4px" }} /> Previous
                    </Button>

                    <Button htmlType="submit" type="primary" style={{ float: "right" }}>
                        Next
                    </Button>

                </Card >
            </Form>
        )
    }
}
