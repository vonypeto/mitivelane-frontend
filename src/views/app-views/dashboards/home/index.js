import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,
  Tag,
} from "antd";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

import {
  VisitorChartData,
  NewMembersData,
  RecentBlotterCaseData,
} from "./HomeDashboard";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
  IdcardOutlined,
  WomanOutlined,
  TeamOutlined,
  ManOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const DisplayDataSet = () => (
  <Row gutter={16}>
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      <DataDisplayWidget
        icon={<ManOutlined />}
        value="13"
        title="Male"
        color="blue"
        vertical={true}
        avatarSize={55}
      />
      <DataDisplayWidget
        icon={<WomanOutlined />}
        value="15"
        title="Female"
        color="volcano"
        vertical={true}
        avatarSize={55}
      />
    </Col>
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      <DataDisplayWidget
        icon={<TeamOutlined />}
        value="28"
        title="Population"
        color="lime"
        vertical={true}
        avatarSize={55}
      />
      <DataDisplayWidget
        icon={<IdcardOutlined />}
        value="17"
        title="Registered Voter"
        color="cyan"
        vertical={true}
        avatarSize={55}
      />
    </Col>
  </Row>
);
const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add all</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const latestRecentBlotterCaseOption = (
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

const tableColumns = [
  {
    title: "ID",
    dataIndex: "blotter_id",
    key: "blotter_id",
  },
  {
    title: "Applicant",
    dataIndex: "applicant",
    key: "applicant",
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar
          size={30}
          className="font-size-sm"
          style={{ backgroundColor: record.reporters[0].avatarColor }}
        >
          {utils.getNameInitial(record.reporters[0].firstname)}
        </Avatar>
        <span className="ml-2">{record.reporters[0].firstname}</span>
      </div>
    ),
  },
  {
    title: "Date Reported",
    dataIndex: "createdAt",
    sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    render: (_, record) => (
      <div className="d-flex align-items-center">
        <span className="ml-2">
          {new Date(record.createdAt).toDateString()}
        </span>
      </div>
    ),
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
  },
  {
    title: () => <div className="text-right">Status</div>,
    key: "status",
    render: (_, record) => (
      <div className="text-right">
        <Tag
          className="mr-0"
          color={
            record.status === "Approved"
              ? "cyan"
              : record.status === "Pending"
              ? "blue"
              : "volcano"
          }
        >
          {record.status}
        </Tag>
      </div>
    ),
  },
];

export const DefaultDashboard = () => {
  const { currentOrganization, generateToken } = useAuth();

  const [visitorChartData] = useState(VisitorChartData);
  const [newMembersData] = useState(NewMembersData);
  const [recentBlotterCaseData] = useState(RecentBlotterCaseData);
  const { direction } = useSelector((state) => state.theme);

  const [blotterlistrequest, setBlotterListRequest] = useState([]);
  // const [blotterlistrequestData, setBlotterListRequestData] = useState([]);
  const [blotterlistRequestLoading, setBlotterListRequestLoading] = useState(
    true
  );

  useEffect(() => {
    getLatestBlotterRequests();
  }, []);

  const getLatestBlotterRequests = () => {
    axios
      .get(
        "/api/blotter_request/get-latest-blotter-requests/" +
          currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Latest Blotter", response.data);
        setBlotterListRequest(response.data);
        setBlotterListRequestLoading(false);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Visitors"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={"400px"}
                direction={direction}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Latest Blotter Report"
                extra={cardDropdown(latestRecentBlotterCaseOption)}
              >
                <Table
                  loading={blotterlistRequestLoading}
                  className="no-border-last"
                  columns={tableColumns}
                  dataSource={blotterlistrequest}
                  rowKey="_id"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={6}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <DisplayDataSet />
            </Col>
            {/* {
              annualStatisticData.map((elm, i) => (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}  key={i}>
                  <StatisticWidget 
                    title={elm.title} 
                    value={elm.value}
                    status={elm.status}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))
            } */}
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Organization Members"
                extra={cardDropdown(newJoinMemberOption)}
              >
                <div className="mt-3">
                  {newMembersData.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarStatus
                        id={i}
                        src={elm.img}
                        name={elm.name}
                        subTitle={elm.title}
                      />
                      <div>
                        <Button
                          icon={<UserAddOutlined />}
                          type="default"
                          size="small"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(DefaultDashboard);
