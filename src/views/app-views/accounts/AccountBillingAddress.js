import React, { useState, useEffect } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
const AccountBillingAddress = () => {
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    setFormData({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: "+44 (1532) 135 7921",
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",
      postcode: "1972",
    });
    form.setFieldsValue({
      avatarUrl: "/img/avatars/thumb-6.jpg",
      name: "Charlie Howard",
      email: "charlie.howard@themenate.com",
      userName: "Charlie",
      dateOfBirth: null,
      phoneNumber: "+44 (1532) 135 7921",
      website: "",
      address1: "San Isidro St",
      city: "Morong",
      country: "Philippines",

      postcode: "1972",
    });
  }, []);
  return (
    <>
      <Col xs={24} sm={24} md={8}></Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Form
          name="basicInformation"
          layout="vertical"
          form={form}
          initialValues={formData}
        >
          <Card className="setting-content" title={"Billing Information"}>
            <Row gutter={ROW_GUTTER}>
              {" "}
              <Col xs={24} sm={24} md={24}>
                <Form.Item label="Address 1" name="address1">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item label="Address 2" name="address2">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Post code" name="postcode">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Save Change
            </Button>
          </Card>
        </Form>
      </Col>
    </>
  );
};

export default AccountBillingAddress;
