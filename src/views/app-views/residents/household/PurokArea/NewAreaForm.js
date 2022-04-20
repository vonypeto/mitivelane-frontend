import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col, Button } from "antd";

const { Option } = Select;

const NewArea = () => {
    return (
        <Row >
            <Form.Item
                name="action"
                hidden
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="purok_id"
                hidden
            >
                <Input />
            </Form.Item>

            <Col span={24}>
                <Form.Item
                    name="name"
                    label="Purok Name"
                    rules={[{ required: true, message: "Please input purok name!" }]}

                >
                    <Input placeholder="Enter name" />
                </Form.Item>
            </Col>

        </Row>
    )
}

export default NewArea