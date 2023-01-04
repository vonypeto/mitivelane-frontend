import { React, useState, useEffect } from "react";
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
import ManageMember from "./ManageTeam";
import ManageOrganization from "./ManageOrganization";
import MemberLeave from "./MemberLeave";
import OrganizationDelete from "./OrganizationDelete";
import OrganizationBilling from "./OrganizationBilling";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { AUTH_TOKEN, ORGANIZATION_REQUEST_ID } from "redux/constants/Auth";

const ManageTeam = (props) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  const [isOwner, setIsOwner] = useState(false)
  const authToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    getOrganizationOwner()

  }, [])

  const getOrganizationOwner = () => {
    axios
      .get(
        `/api/organization/get-organization-owner/${currentOrganization}/${authToken}`,
        generateToken()[1]
      )
      .then((response) => {
        setIsOwner(response.data)
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  }

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">Organization Team</h2>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div className="container" style={{ marginTop: 95 }}>
        <Row gutter={16}>
          <ManageOrganization data={props} />
        </Row>
        <Divider />
        <Row gutter={16}>
          {
            isOwner ? <ManageMember /> : ""
          }
        </Row>
        <Divider />
        <Row gutter={16}>
          <OrganizationBilling />
        </Row>
        <Divider />{" "}
        <Row gutter={16}>
          {
            isOwner ? <OrganizationDelete /> : <MemberLeave />
          }
        </Row>
      </div>
    </div>
  );
};

export default ManageTeam;
