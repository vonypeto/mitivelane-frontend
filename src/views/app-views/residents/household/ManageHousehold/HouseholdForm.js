import React from 'react'
import { Form, Input, InputNumber, Select, Row, Col } from "antd";

const { Option } = Select;

const HouseholdForm = (props) => {
  const { purokList } = props

  console.log("purokList", purokList)

  const numberFilter = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  const rules = {
    house_number: [{
      message: "Please input house number!!",
      required: true
    },
    ],
    house_name: [{
      message: "Please input house name!!",
      required: true
    },
    ],
    purok: [{
      message: "Please input household purok!!",
      required: true
    },
    ],
    house_status: [{
      message: "Please input household status!!",
      required: true
    },
    ],
    family_planning: [{
      message: "Please input household family planning!!",
      required: true
    },
    ],
    water_source: [{
      message: "Please input house water source!!",
      required: true
    },
    ],
    toilet_type: [{
      message: "Please input house toilet type!!",
      required: true
    },
    ],
    waste_management: [{
      message: "Please input house waste management!!",
      required: true
    },
    ],
  }

  return (
    <Row gutter={15}>

      <Col xl={6} lg={12} md={12} span={24}>
        <Form.Item
          name="house_number"
          label="House Number"
          rules={rules.house_number}
        >
          <InputNumber className='w-100' min={0} onKeyPress={(e) => { numberFilter(e) }} />
        </Form.Item>
      </Col>

      <Col xl={9} lg={12} md={12} span={24}>
        <Form.Item
          name="name"
          label="Household Name"
          rules={rules.house_name}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xl={9} lg={8} md={12} span={24}>
        <Form.Item
          name="purok"
          label="Purok"
          rules={rules.purok}
        >
          <Select className="w-100" placeholder="Select">
            {
              purokList.map(elm => (
                <Option key={elm.name} value={elm.name}>{elm.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Col>

      <Col xl={6} lg={8} md={12} span={24}>
        <Form.Item
          name="house_status"
          label="House Status"
          rules={rules.house_status}
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
          rules={rules.family_planning}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xl={6} lg={7} md={12} span={24}>
        <Form.Item
          name="water_source"
          label="Water Source"
          rules={rules.water_source}
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
          rules={rules.toilet_type}
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
          rules={rules.waste_management}
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