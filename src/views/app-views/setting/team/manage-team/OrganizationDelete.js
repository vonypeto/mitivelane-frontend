import { React, useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Avatar,
  Divider,
  Popconfirm,
  message,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
const OrganizationDelete = () => {
  const onDeleteOrganization = () => {
    message.info("Clicked on Yes.");
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Delete Organization</h3>
          <p className="mt-1 text-sm text-gray-600">
            Once the Organization is deleted, all of its resources and data will
            be permanently deleted. Before deleting your account, please
            download any data or information that you wish to retain.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Card title="Deletion Details">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-2 border-top ">
              <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                <Popconfirm
                  placement="top"
                  title="Are you sure to delete this Organization?"
                  onConfirm={onDeleteOrganization}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <Button className="btn-danger">Delete Organization</Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default OrganizationDelete;
