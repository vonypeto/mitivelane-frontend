import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col, Button } from "antd";

const { Option } = Select;

const SupplyGivenForm = () => {
    return (
        <Row >
            <Form.Item
                name="supply_given_id"
                hidden
            >
                <Input />
            </Form.Item>

            <Col span={24}>
                <Form.Item
                    name="household_name"
                    label="Household Name"
                    rules={[{ required: true, message: "Insert household name!" }]}

                >
                    <Input placeholder="Enter household name" />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: "Insert supply amount to be given!" }]}

                >
                    <InputNumber className="w-100" placeholder="Enter supply amount to be given" min={0}/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: "Need date of this transaction!" }]}
                >
                    <DatePicker className='w-100'/>
                </Form.Item>
            </Col>

        </Row>
    )
}

export default SupplyGivenForm