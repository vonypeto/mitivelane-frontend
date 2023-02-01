import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Upload, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Form, Input, Popconfirm } from "antd";
import { dummyRequest, beforeUpload } from "helper/Formula.js";

const Signature = (props) => {
  const {
    onFill,
    formItems,
    handleAddSignature,
    handleRemoveSignature,
    signatureImage,
    loading,
  } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Row>
        {signatureImage.map((data, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <Form.Item>
              <div>
                <Row className="signature-class">
                  <Col xs={10} sm={10} md={11} lg={14}>
                    <Form.Item name={`name${data.id}`}>
                      <Input
                        onChange={(e) => {
                          onFill(
                            e,
                            {
                              type: "name",
                              id: data.id,
                            },

                            "multiform"
                          );
                        }}
                        style={{
                          border: "none",
                          fontWeight: 900,
                        }}
                        className="cert-name "
                        placeholder={`Name${index + 1}`}
                      />
                    </Form.Item>
                    <Form.Item name={`position${data.id}`}>
                      <Input
                        onChange={(e) => {
                          onFill(
                            e,
                            {
                              type: "position",
                              id: data.id,
                            },
                            "multiform"
                          );
                        }}
                        style={{
                          border: "none",
                          fontWeight: 900,
                        }}
                        className="cert-name "
                        placeholder={`Position${index + 1}`}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={2} sm={3} md={3} lg={2}>
                    <div className="pt-3 text-center ">
                      <MinusCircleOutlined
                        onClick={() => handleRemoveSignature(index)}
                      />
                    </div>
                    <Popconfirm
                      placement="top"
                      title="Set as Applicant?"
                      okText="Yes"
                      cancelText="No"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <div
                        className="pt-3 text-center "
                        style={{ cursor: "pointer" }}
                      >
                        <InfoCircleOutlined />
                      </div>
                    </Popconfirm>
                  </Col>
                </Row>
              </div>
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Form.Item>
        {signatureImage.length <= 3 ? (
          <Button
            type="dashed"
            onClick={() => handleAddSignature()}
            block
            icon={<PlusOutlined />}
          >
            Add field
          </Button>
        ) : null}
      </Form.Item>{" "}
    </div>
  );
};

export default Signature;
