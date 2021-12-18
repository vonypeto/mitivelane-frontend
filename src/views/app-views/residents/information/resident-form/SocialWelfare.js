import React from "react";
import { Input, Row, Col, Card, Form } from "antd";

const rules = {
  firstname: [
    {
      required: true,
      message: "Please enter first name",
    },
  ],
  lastname: [
    {
      required: true,
      message: "Please enter last name",
    },
  ],
  middlename: [
    {
      required: true,
      message: "Please enter middle name",
    },
  ],
  alias: [
    {
      required: true,
      message: "Please enter alias",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
};
const SocialWelfareField = () => {
  return (
    <Row>
      <Col xs={24} sm={24} md={17}>
        <Card title="Address">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="pag_ibig"
                    label="PAG-IBIG"
                    rules={rules.lastname}
                  >
                    <Input placeholder="PAG-IBIG" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="philhealth"
                    label="PHILHEALTH"
                    rules={rules.firstname}
                  >
                    <Input placeholder="PHILHEALTH" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="sss"
                    label="Social Security System"
                    rules={rules.firstname}
                  >
                    <Input placeholder="Social Security System" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="TIN"
                    label="Taxpayer Identification Number"
                    rules={rules.firstname}
                  >
                    <Input placeholder="Taxpayer Identification Number" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SocialWelfareField;
