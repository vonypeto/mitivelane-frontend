import React from "react";

//Hooks
import { Row, Col, Card, Form, Input, Tabs, Button } from "antd";
import { AiOutlineLeft } from "react-icons/ai";

const { TextArea } = Input;

const OrganizationInfoForm = () => {
  return (
    <Row gutter={12}>
      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form2-items"
          name="official_name"
          rules={[{ required: true, message: "Need official name!" }]}
          label="Official name:"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form.Item
          className="form2-items"
          name="organization"
          rules={[{ required: true, message: "Need organization!" }]}
          label="Organization:"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
        <Form.Item
          className="form2-items"
          name="municipality"
          rules={[{ required: true, message: "Need municipality!" }]}
          label="Municipality: "
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
        <Form.Item
          className="form2-items"
          name="province"
          rules={[{ required: true, message: "Need province!" }]}
          label="Province: "
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
        <Form.Item
          className="form2-items"
          name="country"
          rules={[{ required: true, message: "Need country!" }]}
          label="Country: "
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          className="form2-items"
          name="organization_address"
          rules={[{ required: true, message: "Need organization address!" }]}
          label="Organization address: "
          hasFeedback
        >
          <TextArea autoSize />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default OrganizationInfoForm;
