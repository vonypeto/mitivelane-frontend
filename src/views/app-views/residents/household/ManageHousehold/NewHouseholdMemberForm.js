import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col } from "antd";

const { Option } = Select;

const NewHouseholdMemberForm = () => {
    return (
        <Row >
            <Form.Item
                name="id"
                hidden
            >
                <Input />
            </Form.Item>

            <Col span={24}>
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: "Please input resident's first name!" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[{ required: true, message: "Please input resident's last name!" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="birthday"
                    label="Birthday"
                    rules={[{ required: true, message: "Please input resident's birthday!" }]}
                >
                    <DatePicker className='w-100' />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ required: true, message: "Please input resident's age!" }]}
                >
                    <InputNumber className='w-100' min={0} />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="blood_type"
                    label="Blood Type"
                    rules={[{ required: true, message: "Please input resident's blood type!" }]}
                >
                    <Select>
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="AB">AB</Option>
                        <Option value="O">O</Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="civil_status"
                    label="Civil Status"
                    rules={[{ required: true, message: "Please input resident's civil status!" }]}
                >
                    <Select>
                        <Option value="Single">Single</Option>
                        <Option value="Married">Married</Option>
                        <Option value="Seperated">Seperated</Option>
                        <Option value="Widowed">Widowed</Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="educational_attainment"
                    label="Educational Attainment"
                    rules={[{ required: true, message: "Please input resident's educational attainment!" }]}
                >
                    <Select >
                        <Option value="Elementary School Graduate">Elementary School Graduate</Option>
                        <Option value="HighSchool Graduate">HighSchool Graduate</Option>
                        <Option value="College Graduate">College Graduate</Option>
                        <Option value="Undergraduate">Undergraduate</Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="occupation"
                    label="Occupation"
                    rules={[{ required: true, message: "Please input resident's occupation!" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="ofw"
                    label="OFW"
                    rules={[{ required: true, message: "Please input if resident is not an OFW or state his/her job  as an OFW!" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="illness"
                    label="Illness"
                    rules={[{ required: true, message: "Please input if resident has any occuring illness" }]}
                >
                    <Input />
                </Form.Item>
            </Col>

        </Row>
    )
}

export default NewHouseholdMemberForm