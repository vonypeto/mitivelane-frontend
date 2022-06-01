import React from 'react'
import { Form, Input, InputNumber, DatePicker, Select, Row, Col, Button } from "antd";
import moment from 'moment';

const { Option } = Select;

const SupplyReceiveForm = (props) => {
    const { action } = props
    var datePickerAttr = {
        name: "date",
        label: "Date",
        rules: [{ required: true, message: "Need date of this transaction!" }]
    }

    if (action == "added") {
        datePickerAttr["initialValue"] = moment(Date.now())
    }
    
    return (
        <Row >
            <Form.Item
                name="supply_receive_id"
                hidden
            >
                <Input />
            </Form.Item>

            <Col span={24}>
                <Form.Item
                    name="source"
                    label="Source"
                    rules={[{ required: true, message: "Insert source of the supply being received!" }]}

                >
                    <Input placeholder="Enter source of supply" />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: "Insert supply amount to be received!" }]}
                >
                    <InputNumber className="w-100" placeholder="Enter supply amount to be received" min={0}/>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    {...datePickerAttr}
                >
                    <DatePicker className='w-100'/>
                </Form.Item>
            </Col>

        </Row>
    )
}

export default SupplyReceiveForm