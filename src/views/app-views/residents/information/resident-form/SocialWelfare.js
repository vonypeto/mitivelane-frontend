import React from "react";
import { Input, Row, Col, Card, Form } from "antd";
import { social_welfare } from "./AddResidentRules";

const SocialWelfareField = () => {
  return (
    <Row>
      <Col xs={24} sm={24} md={17}>
        <Card title="Social Welfare Service">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="pag_ibig"
                    label="PAG-IBIG"
                    rules={social_welfare.pag_ibig}
                  >
                    <Input placeholder="PAG-IBIG" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="philhealth"
                    label="PHILHEALTH"
                    rules={social_welfare.philhealth}
                  >
                    <Input placeholder="PHILHEALTH" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="sss"
                    label="Social Security System"
                    rules={social_welfare.sss}
                  >
                    <Input placeholder="Social Security System" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="tin"
                    label="Taxpayer Identification Number"
                    rules={social_welfare.tin}
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
