import { React } from "react";
import { Col, Card, Dropdown, Table, Menu, Tag, Row } from "antd";
import BlotterRole from "assets/data/blotter-role.json";
import Flex from "components/shared-components/Flex";

import {
  FileExcelOutlined,
  PrinterOutlined,
  EllipsisOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";

const viewDetails = (row) => {
  return row;
};

const dropdownMenu = (row) => (
  <Menu>
    <Menu.Item onClick={() => viewDetails(row)}>
      <Flex alignItems="center">
        <EyeOutlined />
        <span className="ml-2">View</span>
      </Flex>
    </Menu.Item>
  </Menu>
);

const BlotterRecords = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, rolelist) => (
      <div className="text-left">
        <Tag
          className="mr-0"
          color={
            rolelist.role === "Reporter"
              ? "cyan"
              : rolelist.role === "Assailant"
              ? "volcano"
              : "volcano"
          }
        >
          {rolelist.role}
        </Tag>
      </div>
    ),
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
  },
  {
    title: "Date Occurred",
    dataIndex: "date_incident",
    key: "date_incident",
  },
  {
    title: "Location Occurred",
    dataIndex: "incident_location",
    key: "incident_location",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, statuslist) => (
      <div className="text-left">
        <Tag
          className="mr-0"
          color={
            statuslist.status === "Ongoing"
              ? "cyan"
              : statuslist.status === "Settled"
              ? "blue"
              : "volcano"
          }
        >
          {statuslist.status}
        </Tag>
      </div>
    ),
  },

  {
    title: () => <div className="text-right">Action</div>,
    dataIndex: "actions",
    render: (_, elm) => (
      <div className="text-right">
        <EllipsisDropdown menu={dropdownMenu(elm)} />
      </div>
    ),
  },
];

const BlotterField = (props) => {
  const { resident_id, organization_id } = props;
  console.log(props);

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card title="Blotter Records" extra={cardDropdown(BlotterRecords)}>
          <Table
            columns={columns}
            className="no-border-last"
            //eslint-disable-next-line
            dataSource={BlotterRole.filter(
              (data) =>
                data.organization_id == organization_id &&
                data.resident_id == resident_id
            )}
            rowKey="blotter_role_id"
            pagination="true"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default BlotterField;
