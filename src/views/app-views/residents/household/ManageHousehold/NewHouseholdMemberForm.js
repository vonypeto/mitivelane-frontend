import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col } from "antd";

const { Option } = Select;

const NewHouseholdMemberForm = () => {
    return (
        <Row >

            <Col span={24}>
                <Form.Item
                    name="first_name"
                    label="First Name"
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                >
                    <Input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="birthday"
                    label="Birthday"
                >
                    <DatePicker className='w-100'/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="age"
                    label="Age"
                >
                    <InputNumber className='w-100' min={0}/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="blood_type"
                    label="Blood Type"
                >
                    <Select defaultValue={"A"}>
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="AB">AB</Option>
                        <Option value="O">O</Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="educational_attainment"
                    label="Educational Attainment"
                >
                    <Select defaultValue={"Elementary School Graduate"}>
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
                >
                    <Input/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="ofw"
                    label="OFW"
                >
                    <Input/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="illness"
                    label="Illness"
                >
                    <Input/>
                </Form.Item>
            </Col>

        </Row>
    )
}

export default NewHouseholdMemberForm