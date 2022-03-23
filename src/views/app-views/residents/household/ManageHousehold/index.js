import React from 'react'
import { useParams } from "react-router-dom";
import { Card, Form, Input, Select } from "antd";
const { Option } = Select;

const ManageHousehold = (props) => {
  const { barangay_id, mode } = props
  const { household_id } = useParams();

  console.log(barangay_id)
  return (
    <div>
      <Card>
        {mode == "ADD" &&
          <h1>Add Household</h1>
        }

        {mode == "EDIT" &&
          <div>
            <h1>Manage Household</h1>
            <p>ManageHousehold: {household_id}</p>
          </div>
        }
        <p>barangay_id: {barangay_id}</p>
      </Card>

      <Form
        name='household_form'
      >
        <Card title={<h1>Household Info</h1>}>

          <Form.Item
            name="name"
            label="Household Name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="purok"
            label="Purok"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="house_status"
            label="House Status"
          >
            <Select defaultValue={"owned"}>
              <Option value="owned">Owned</Option>
              <Option value="renting">Renting</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="family_planning"
            label="Family Planning"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="water_source"
            label="Water Source"
          >
              <Select defaultValue={"pipe"}>
              <Option value="pipe">Owned</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="toilet_type"
            label="Toilet Type"
          >
              <Select defaultValue={"pipe"}>
              <Option value="pipe">Owned</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="waste_management"
            label="Waste Management"
          >
              <Select defaultValue={"pipe"}>
              <Option value="pipe">Owned</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>

        </Card>

      </Form>
    </div>
  )
}

export default ManageHousehold