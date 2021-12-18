import React, { useState, useRef } from 'react'

//Hooks
import { Row, Col, Card, Form, Input, Tabs, Button } from "antd";
import { AiOutlineLeft } from "react-icons/ai"

const { TabPane } = Tabs;
const { TextArea } = Input;

const AdminRegisterForm3 = (props) => {

    const [activeKey, SetActiveKey] = useState("1");
    const formRef = useRef();

    const callback = (key) => {
        SetActiveKey(key + "");
        formRef.current.resetFields();
    }

    const barangayRegister = () => {
        SetActiveKey("2");
    };

    const onFinish = (value) => {
        console.log(value);
        props.next()
    }

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={onFinish} >
            <Card className="sign-up-card">

                <Tabs activeKey={activeKey} size={'large'} onChange={callback} destroyInactiveTabPane={true}>

                    <TabPane tab="Join Barangay" key="1">
                        {/* Title */}
                        <div style={{ textAlign: "center", paddingBottom: "20px", margin: "auto 15%" }}>
                            <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Barangay Invite</h1>
                            <p>Barangay link are given by barangays allowing you to join them. Contact your preferred barangay for their invite link. For barangays interested registering, please proceed to <a onClick={barangayRegister}>"Register Barangay"</a></p>
                        </div>

                        <Form.Item
                            name="barangay_link"
                            rules={[{ required: true, message: 'Need barangay link!' }]}
                            label="Enter barangay link:"
                        >
                            <Input />
                        </Form.Item>
                    </TabPane>

                    <TabPane tab="Register Barangay" key="2">

                        {/* Title */}
                        <div style={{ textAlign: "center", margin: "auto 15%" }}>
                            <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Register Barangay</h1>
                            <p>Enter the data accordingly to your barangay. You can always update your barnagay's data anytime.</p>
                        </div>

                        <Row gutter={12}>

                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="official_name"
                                    rules={[{ required: true, message: 'Need official name!' }]}
                                    label="Official name:"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="barangay"
                                    rules={[{ required: true, message: 'Need barangay!' }]}
                                    label="Barangay:"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="municipality"
                                    rules={[{ required: true, message: 'Need municipality!' }]}
                                    label="Municipality: "
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="province"
                                    rules={[{ required: true, message: 'Need province!' }]}
                                    label="Province: "
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="country"
                                    rules={[{ required: true, message: 'Need country!' }]}
                                    label="Country: "
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    className="form2-items"
                                    name="barangay_address"
                                    rules={[{ required: true, message: 'Need barangay address!' }]}
                                    label="Barangay address: "
                                >
                                    <TextArea autoSize />
                                </Form.Item>
                            </Col>
                        </Row>

                    </TabPane>
                </Tabs>

            </Card>

            <Button style={{ margin: '0 8px' }} onClick={() => props.prev()}>
                <AiOutlineLeft style={{ paddingTop: "4px" }} /> Previous
            </Button>
            <Button htmlType="submit" type="primary" style={{ float: "right" }}>
                Next
            </Button>

        </ Form >
    );

}

export default AdminRegisterForm3;

