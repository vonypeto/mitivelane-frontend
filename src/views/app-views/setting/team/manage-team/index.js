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
import ManageMember from "./ManageTeam";
import ManageBarangay from "./ManageBarangay";
import BarangayDelete from "./BarangayDelete";

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
            <h2 className="mb-3">Barangay Team</h2>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div className="container" style={{ marginTop: 95 }}>
        <Row gutter={16}>
          <ManageBarangay data={props} />
        </Row>
        <Divider />
        <Row gutter={16}>
          <ManageMember />
        </Row>
        <Divider />
        <Row gutter={16}>
          <BarangayDelete />
        </Row>
      </div>
    </div>
  );
};

export default ManageTeam;
