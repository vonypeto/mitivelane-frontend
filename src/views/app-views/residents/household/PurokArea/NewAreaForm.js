import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col, Button } from "antd";

const { Option } = Select;

const NewArea = () => {
    return (
        <Row >
            <Col span={24}>
                <Form.Item
                    name="name"
                    label="Purok Name"
                    rules={[{ required: true, message: "Please input purok name!" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

        </Row>
    )
}

export default NewArea