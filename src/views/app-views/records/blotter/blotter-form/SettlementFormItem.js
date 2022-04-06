import React from 'react'
import { SettlementData } from "./BlotterData";
import { getLocalStorage, setLocalStorageObject } from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
import {
    Card,
    Form,
    Select
} from "antd";
const { Option } = Select;

const SettlementFormItem = () => {
    return (
        <Card title="Settlement Status:">
            <Form.Item
                name="settlement_status"
                label="Status"
                rules={[{ required: true }]}
            >
                <Select className="w-100" placeholder="Settled" onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "settlement_status")}>
                    {SettlementData.map((elm) => (
                        <Option key={elm} value={elm}>
                            {elm}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Card>
    )
}

export default SettlementFormItem