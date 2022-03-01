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
import AccountDetails from "./AccountDetails";
import ConnectedAccount from "./ConnectedAccounts";
import AccountDelete from "./AccountDelete";
import AccountSesson from "./AccountSesson";

const ManageTeam = (props) => {
  console.log(props);

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
            <h2 className="mb-3">Account Setting</h2>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div className="container" style={{ marginTop: 95 }}>
        <Row gutter={16}>
          <AccountDetails data={props} />
        </Row>
        <Divider />
        <Row gutter={16}>
          {" "}
          <ConnectedAccount />{" "}
        </Row>{" "}
        <Divider />
        <Row gutter={16}>
          <AccountSesson />{" "}
        </Row>
        <Divider />
        <Row gutter={16}>
          <AccountDelete />{" "}
        </Row>
      </div>
    </div>
  );
};

export default ManageTeam;
