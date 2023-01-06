import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col, Button, Divider, message } from "antd";

const { Option } = Select;

const NewHouseholdMemberForm = ({ residentList, importResidentAsMember, memberModalAction }) => {

    const handleChange = (value) => {
        importResidentAsMember(value)
    }

    const printResidentOption = () => {
        return (
            residentList.map((resident, key) => {
                return (
                    <Option key={key} value={key}>
                        {`${resident.firstname} ${resident.lastname} `}
                    </Option>
                )
            })
        )

    }

    return (
        <Row >
            <Form.Item
                name="_id"
                hidden
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="row_id"
                hidden
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
                name="isOld"
                hidden
            >
                <Input />
            </Form.Item> */}

            <Col span={24}>
                <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[{ required: true, message: "Please select a resident to add!" }]}
                // rules={[{ required: true, message: "Please input resident's first name!" }]}

                >
                    <Input disabled />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[{ required: true, message: "Please select a resident to add!" }]}
                // rules={[{ required: true, message: "Please input resident's last name!" }]}
                >
                    <Input disabled />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="birthday"
                    label="Birthday"
                    rules={[{ required: true, message: "Please select a resident to add!" }]}
                // rules={[{ required: true, message: "Please input resident's birthday!" }]}
                >
                    <DatePicker className='w-100' disabled />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ required: true, message: "Please select a resident to add!" }]}
                // rules={[{ required: true, message: "Please input resident's age!" }]}
                >
                    <InputNumber className='w-100' min={0} disabled />
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

            {memberModalAction == "add" &&
                <Col span={24}>
                    <Divider>Import Resident Data</Divider>
                    <Select onChange={handleChange} className="w-100 mb-3" placeholder="Choose Resident" allowClear>
                        {printResidentOption()}
                    </Select>
                </Col> 
            }

            {/* <Button
                type='primary'
                className='w-100'
                onClick={() => { importResidentAsMember("print dis") }}
            >
                Import resident data
            </Button> */}
        </Row>
    )
}

export default NewHouseholdMemberForm