import { Row, Col, Avatar, Dropdown, Menu, Tag } from "antd";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import {
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
export const VisitorChartData = {
  series: [
    {
      name: "Session Duration",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "Page Views",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
  ],
  categories: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
  ],
};

export const ActiveMembersData = [
  {
    name: "Members",
    data: [25, 15, 41, 25, 44, 12, 36, 19, 54],
  },
];

export const NewMembersData = [
  {
    img: "/img/avatars/thumb-2.jpg",
    title: "Barangay Captain",
    name: "Terrance Moreno",
  },
  {
    img: "/img/avatars/thumb-3.jpg",
    title: "Secretary",
    name: "Ron Vargas",
  },
  {
    img: "/img/avatars/thumb-4.jpg",
    title: "Tanod",
    name: "Luke Cook",
  },
  {
    img: "/img/avatars/thumb-5.jpg",
    title: "Tanod",
    name: "Joyce Freeman",
  },
  {
    img: "/img/avatars/thumb-6.jpg",
    title: "test",
    name: "Samantha Phillips",
  },
];

export const RecentBlotterCaseData = [
  {
    id: "#5331",
    applicant: "Clayton Bates",
    date: "8 May 2020",
    classification: "Rape",
    status: "Approved",
    avatarColor: "#04d182",
  },
  {
    id: "#5332",
    applicant: "Gabriel Frazier",
    date: "6 May 2020",
    classification: "Baho Gian",
    status: "Approved",
    avatarColor: "#fa8c16",
  },
  {
    id: "#5333",
    applicant: "Debra Hamilton",
    date: "1 May 2020",
    classification: "Attack",
    status: "Pending",
    avatarColor: "#1890ff",
  },
  {
    id: "#5334",
    applicant: "Stacey Ward",
    date: "28 April 2020",
    classification: "Molested",
    status: "Rejected",
    avatarColor: "#ffc542",
  },
  {
    id: "#5335",
    applicant: "Troy Alexander",
    date: "28 April 2020",
    classification: "test",
    status: "Approved",
    avatarColor: "#ff6b72",
  },
];

export const DisplayDataSet = () => (
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
export const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add Members</span>
        </div>
      </span>
    </Menu.Item>
    {/* <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item> */}
  </Menu>
);

export const latestRecentBlotterCaseOption = (
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

export const cardDropdown = (menu) => (
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

export const tableColumns = [
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
