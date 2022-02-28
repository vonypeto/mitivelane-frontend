import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Table,
  Tooltip,
  Select,
  Input,
  Button,
  Menu,
  Space,
  Row,
  Badge,
  Tag,
  Avatar,
  List,
  message
} from "antd";
import BlotterListData from "assets/data/blotter.data.json";
import BlotterListRequestData from "assets/data/blotter-request.data.json";

import DonutChartWidget from "components/shared-components/DonutChartWidget";
import NumberFormat from "react-number-format";
import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { Dropdown } from "antd";
import UserView from "./BlotterRequest";

import {
  sessionData,
  sessionLabels,
  conbinedSessionData,
  sessionColor,
  BlotterReportMost,
} from "./BlotterData";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const { Option } = Select;
const categories = ["Scheduled", "Unscheduled", "Settled", "Unsettled"];

const BlotterRecord = (props) => {
  const {
    generateToken
  } = useAuth();

  const { param_url } = props;
  console.log("List Second Loop: " + param_url);
  let history = useHistory();

  const [blotterlist, setBlotterList] = useState([]);
  const [blotterlistLoading, setBlotterListLoading] = useState(true);

  const [blotterlistrequest, setBlotterListRequest] = useState(
    BlotterListRequestData
  );

  const [selectedRowsBlotter, setSelectedRowsBlotter] = useState([]);
  const [selectedRowKeysBlotter, setSelectedRowKeysBlotter] = useState([]);

  const [selectedRowsBlotterRequest, setSelectedRowsBlotterRequest] = useState(
    []
  );
  const [
    selectedRowKeysBlotterRequest,
    setSelectedRowKeysBlotterRequest,
  ] = useState([]);

  const [userProfileVisible, SetUserProfileVisible] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);

  const showUserProfile = (UserList) => {
    SetUserProfileVisible(true);
    SetSelectedUser(UserList);
  };

  const closeUserProfile = () => {
    SetUserProfileVisible(false);
    SetSelectedUser(null);
  };

  useEffect(() => {
    axios.get("/api/blotter/get-blotters/" + param_url, generateToken()[1]).then((response) => {
      console.log(response.data)
      setBlotterList(response.data)
      setBlotterListLoading(false)
    }).catch(() => {
      message.error("Could not fetch the data in the server!")
    });

  }, [])

  const BlotterDropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1} onClick={() => BlottereditwDetails(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => BlotterDeleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRowsBlotter.length > 0
              ? `Delete (${selectedRowsBlotter.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const AddResident = () => {
    history.push(`/app/${param_url}/records/blotter-record/add`);
  };
  const BlottereditwDetails = (row) => {
    history.push(`/app/1002/records/blotter-record/${row.blotter_id}/edit`);
  };
  const BlotterDeleteRow = (row) => {
    const objKey = "blotter_id";
    let data = blotterlist;
    if (selectedRowsBlotter.length > 1) {
      selectedRowsBlotter.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.blotter_id);
        setBlotterList(data);
        setSelectedRowsBlotter([]);
      });
    } else {
      data = utils.deleteArrayRow(data, objKey, row.blotter_id);
      setBlotterList(data);
    }
  };
  const BlotterRequestDeleteRow = (row) => {
    const objKey = "blotter_id";
    let data = blotterlistrequest;
    if (selectedRowsBlotterRequest.length > 1) {
      selectedRowsBlotterRequest.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.blotter_id);
        setBlotterListRequest(data);
        setSelectedRowsBlotterRequest([]);
      });
    } else {
      data = utils.deleteArrayRow(data, objKey, row.blotter_id);
      setBlotterListRequest(data);
    }
  };

  // COLUMNS
  const blotterdatacolumn = [
    {
      title: "Blotter ID",
      dataIndex: "blotter_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Reporters",
      dataIndex: "reporters",
      key: "reporters",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={30}
            className="font-size-sm"
            style={{ backgroundColor: "#" + "04d182" }}
          >
            {utils.getNameInitial("Test Name")}
          </Avatar>
          <span className="ml-2">{"Test Name"}</span>
        </div>
      ),
    },

    {
      title: "Date Occured",
      dataIndex: "date_of_incident",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Date Reported",
      dataIndex: "createdAt",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Location",
      dataIndex: "place_incident",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Classification",
      dataIndex: "incident_type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },

    {
      title: () => <div className="text-center">Case</div>,
      key: "settlement_status",
      render: (_, record) => (
        <div className="text-center">
          <Tag
            className="mr-0"
            color={
              record.settlement_status === "Settled"
                ? "geekblue"
                : record.settlement_status === "Unsettled"
                  ? "orange"
                  : record.settlement_status === "Scheduled"
                    ? "cyan"
                    : "gold"
            }
          >
            {record.settlement_status}
          </Tag>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={BlotterDropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const BlotterRequest = [
    {
      title: "ID",
      dataIndex: "blotter_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={30}
            className="font-size-sm"
            style={{ backgroundColor: "#" + record.avatarColor }}
          >
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{text}</span>
        </div>
      ),
    },

    {
      title: "Date Occured",
      dataIndex: "incidentdate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Date Reported",
      dataIndex: "daterecorded",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Location",
      dataIndex: "incidentlocation",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Classification",
      dataIndex: "classification",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          {/* {console.log("actio9n" + elm.blotter_id)} */}
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="Approve">
              <Button
                className="mr-2 btn-success background"
                icon={<CheckCircleOutlined className="approve" />}
                onClick={() => { }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip
              title={
                selectedRowsBlotterRequest.length > 0
                  ? `Delete (${selectedRowsBlotterRequest.length})`
                  : "Delete"
              }
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  BlotterRequestDeleteRow(elm);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  //EXPORT
  const BlotterRequestList = (
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

  //SEARCH
  const rowSelectionBlotter = {
    onChange: (key, rows) => {
      setSelectedRowsBlotter(rows);
      setSelectedRowKeysBlotter(key);
    },
  };
  const rowSelectionBlotterRequest = {
    onChange: (key, rows) => {
      setSelectedRowsBlotterRequest(rows);
      setSelectedRowKeysBlotterRequest(key);
    },
  };

  const onBlotterSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? blotterlist : BlotterListData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterList(data);
    setSelectedRowKeysBlotter([]);
  };

  const onBlotterRequestSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? blotterlistrequest
      : BlotterListRequestData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterListRequest(data);
    setSelectedRowKeysBlotterRequest([]);
  };

  const BlotterCases = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(BlotterListData, key, value);
      setBlotterList(data);
    } else {
      setBlotterList(BlotterListData);
    }
  };

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

  //  RETURN
  const RecordCases = () => (
    <DonutChartWidget
      series={sessionData}
      labels={sessionLabels}
      title="Record by Cases"
      customOptions={{ colors: sessionColor }}
      bodyClass="mb-2 mt-3"
      extra={
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={24}>
            <div className="mx-auto mt-4" style={{ maxWidth: 200 }}>
              {conbinedSessionData.map((elm) => (
                <Flex
                  alignItems="center"
                  justifyContent="between"
                  className="mb-3"
                  key={elm.label}
                >
                  <div>
                    <Badge color={elm.color} />
                    <span className="text-gray-light">{elm.label}</span>
                  </div>
                  <span className="font-weight-bold text-dark">{elm.data}</span>
                </Flex>
              ))}
            </div>
          </Col>
        </Row>
      }
    />
  );
  const MostReportedBlotter = () => (
    <Card title="Most Reported Cases">
      <List
        itemLayout="horizontal"
        dataSource={BlotterReportMost}
        renderItem={(item) => (
          <List.Item>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div>
                <h4 className="mb-0 font-weight-bold">{item.title}</h4>
                <span className="text-muted">{item.update}</span>
              </div>
              <div>
                <Tag color="blue">
                  <span className="font-weight-bold">
                    <NumberFormat
                      value={item.amount}
                      thousandSeparator={true}
                      displayType="text"
                    ></NumberFormat>
                  </span>
                </Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Blotter Records"
                extra={cardDropdown(BlotterListData)}
              >
                <Flex
                  alignItems="center"
                  className=""
                  justifyContent="between"
                  mobileFlex={false}
                >
                  <Flex className="mb-1" mobileFlex={false}>
                    <div className="mb-3 mr-md-3">
                      <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={(e) => onBlotterSearch(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <Select
                        defaultValue="All"
                        className="w-100"
                        style={{ minWidth: 180 }}
                        onChange={BlotterCases}
                        placeholder="Category"
                      >
                        <Option value="All">All</Option>
                        {categories.map((elm) => (
                          <Option key={elm} value={elm}>
                            {elm}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </Flex>
                  <div className="justify-content-between">
                    <Space>
                      <Col>
                        <Button
                          onClick={AddResident}
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          block
                        >
                          Add Blotter Cases
                        </Button>
                      </Col>
                    </Space>
                  </div>
                </Flex>

                <div className="table-responsive">
                  <Table
                    loading={blotterlistLoading}
                    className="no-border-last"
                    columns={blotterdatacolumn}
                    dataSource={blotterlist}
                    rowKey="blotter_id"
                    scroll={{ x: "max-content" }}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeysBlotter,
                      type: "checkbox",
                      preserveSelectedRowKeys: false,
                      ...rowSelectionBlotter,
                    }}
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Blotter Request"
                extra={cardDropdown(BlotterRequestList)}
              >
                <Flex
                  alignItems="center"
                  className=""
                  justifyContent="between"
                  mobileFlex={false}
                >
                  <Flex className="mb-1" mobileFlex={false}>
                    <div className="mb-3 mr-md-3">
                      <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={(e) => onBlotterRequestSearch(e)}
                      />
                    </div>
                    <div className="mb-3"></div>
                  </Flex>
                </Flex>
                <div className="table-responsive">
                  <Table
                    columns={BlotterRequest}
                    dataSource={blotterlistrequest}
                    rowKey="blotter_id"
                    scroll={{ x: "max-content" }}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeysBlotterRequest,
                      type: "checkbox",
                      preserveSelectedRowKeys: false,
                      ...rowSelectionBlotterRequest,
                    }}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <RecordCases />
          <MostReportedBlotter />
        </Col>

        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            closeUserProfile();
          }}
        />
      </Row>
    </>
  );
};
export default BlotterRecord;
