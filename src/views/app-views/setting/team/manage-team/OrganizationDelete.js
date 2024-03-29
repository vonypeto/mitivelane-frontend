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
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { AUTH_TOKEN, ORGANIZATION_REQUEST_ID } from "redux/constants/Auth";

const OrganizationDelete = ({ isOwner }) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const history = useHistory();

  const deleteOrganization = () => {
    message.info("Delete Organization");
    // axios
    //   .post(
    //     "/api/organization_setting/delete-organization", { "organization_id": currentOrganization },
    //     generateToken()[1]
    //   )
    //   .then((response) => {
    //     console.log("Delete Organization Request ", response.data);
    //   })
    //   .catch(() => {
    //     message.error("Could not fetch the data in the server!");
    //   });
  };

  const leaveOrganization = () => {
    axios
      .post(
        "/api/organization_setting/leave-organization",
        { organization_id: currentOrganization, uuid: authToken },
        generateToken()[1]
      )
      .then((response) => {
        if (response.data == "Success") {
          message.success("Leave Organization");
          history.push("/");
        } else {
          message.error("The action can't be completed, please try again.");
        }
      })
      .catch(() => {
        message.error("The action can't be completed, please try again.");
      });
  };

  const DeleteOrganization = () => {
    return (
      <>
        <Col xs={24} sm={24} md={8}>
          <div className="pl-1">
            <h3>Deactivate Organization</h3>
            <p className="mt-1 text-sm text-gray-600">
              Once the Organization is Deactivate, all of its resources and data
              will be permanently Deactivate. Before deleting your account, please
              download any data or information that you wish to retain.
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={15} className="ant-body-pt">
          <Card title="Deactivation Details">
            <Col xs={24} sm={24} md={24} className="w-100">
              <Row className="pt-2 border-top ">
                <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                  <Popconfirm
                    placement="top"
                    title="Are you sure to Deactivate this Organization?"
                    onConfirm={deleteOrganization}
                    okText="Yes"
                    cancelText="No"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button className="btn-danger">Deactivate Organization</Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
      </>
    );
  };

  const LeaveOrganization = () => {
    return (
      <>
        <Col xs={24} sm={24} md={8}>
          <div className="pl-1">
            <h3>Leave Organization</h3>
            <p className="mt-1 text-sm text-gray-600">
              Once you leave the Organization, all of its resources and data
              will be permanently deleted. Before deleting your account, please
              download any data or information that you wish to retain.
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={15} className="ant-body-pt">
          <Card title="Deactivation Details">
            <Col xs={24} sm={24} md={24} className="w-100">
              <Row className="pt-2 border-top ">
                <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                  <Popconfirm
                    placement="top"
                    title="Are you sure to leave this Organization?"
                    onConfirm={leaveOrganization}
                    okText="Yes"
                    cancelText="No"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button className="btn-danger">Leave Organization</Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
      </>
    );
  };

  return <>{isOwner ? <DeleteOrganization /> : <LeaveOrganization />}</>;
};

export default OrganizationDelete;
