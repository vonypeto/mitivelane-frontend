import React from 'react'
import { Form, Input, InputNumber, Select, Row, Col } from "antd";

const { Option } = Select;

const HouseholdForm = () => {
  return (
    <Row gutter={15}>

      <Col xl={6} lg={12} md={12} span={24}>
        <Form.Item
          name="house_number"
          label="House Number"
        >
          <InputNumber className='w-100' min={0} />
        </Form.Item>
      </Col>

      <Col xl={9} lg={12} md={12} span={24}>
        <Form.Item
          name="name"
          label="Household Name"
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xl={9} lg={8} md={12} span={24}>
        <Form.Item
          name="purok"
          label="Purok"
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xl={6} lg={8} md={12} span={24}>
        <Form.Item
          name="house_status"
          label="House Status"
        >
          <Select>
            <Option value="owned">Owned</Option>
            <Option value="renting">Renting</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xl={6} lg={8} md={12} span={24}>
        <Form.Item
          name="family_planning"
          label="Family Planning"
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xl={6} lg={7} md={12} span={24}>
        <Form.Item
          name="water_source"
          label="Water Source"
        >
          <Select>
            <Option value="pipe">Pipe</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xl={6} lg={8} md={12} span={24}>
        <Form.Item
          name="toilet_type"
          label="Toilet Type"
        >
          <Select>
            <Option value="open pit">Open Pit</Option>
            <Option value="sealed">Sealed</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xl={6} lg={9} md={12} span={24}>
        <Form.Item
          name="waste_management"
          label="Waste Management"
        >
          <Select span={24}>
            <Option value="collect">Collect</Option>
            <Option value="burn">Burn</Option>
            <Option value="dump">Dump</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  )
}

export default HouseholdForm