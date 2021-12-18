import React, { useMemo, useState } from "react";

//Hooks
import { Row, Col, Form, Input, Select, DatePicker, InputNumber } from "antd";
import countryList from "react-select-country-list";

const { Option } = Select;
const { TextArea } = Input;

const BarangayRegisterForm = () => {
  const options = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");

  const changeHandler = (value) => {
    setCountry(value);
  };
  return (
    <Row gutter={12}>
      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="first_name"
          rules={[{ required: true, message: "Enter your first name!" }]}
          label="First name:"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="last_name"
          rules={[{ required: true, message: "Enter your last name!" }]}
          label="Last name: "
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="middle_name"
          rules={[{ required: true, message: "Enter your middle name!" }]}
          label="Middle name:"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="birthday"
          rules={[{ required: true, message: "Enter your birthday!" }]}
          label="Birthday:"
          hasFeedback
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="gender"
          rules={[{ required: true, message: "Choose your gender!" }]}
          label="Gender:"
          hasFeedback
        >
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="civil_status"
          rules={[{ required: true, message: "Choose your civil status!" }]}
          label="Civil Status:"
          hasFeedback
        >
          <Select>
            <Option value="Single">Single</Option>
            <Option value="Married">Married</Option>
            <Option value="Divorced">Divorced</Option>
            <Option value="Widowed">Widowed </Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="country"
          rules={[{ required: true, message: "Need country!" }]}
          label="Country: "
          hasFeedback
        >
          {/* <Input /> */}
          <Select
            options={options}
            value={country}
            onChange={changeHandler}
            showSearch
          ></Select>
        </Form.Item>
      </Col>
      <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="province"
          rules={[{ required: true, message: "Need province!" }]}
          label="Province: "
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="municipality"
          rules={[{ required: true, message: "Need municipality!" }]}
          label="Municipality:"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="mobile_number"
          rules={[{ required: true, message: "Need your mobile number!" }]}
          label="Mobile number:"
          hasFeedback
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form1-items"
          name="telephone_number"
          rules={[{ required: true, message: "Need your telephone number!" }]}
          label="Telephone number: "
          hasFeedback
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          className="form1-items"
          name="address"
          rules={[{ required: true, message: "Enter your address!" }]}
          label="Address:"
          hasFeedback
        >
          <TextArea autoSize />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default BarangayRegisterForm;
