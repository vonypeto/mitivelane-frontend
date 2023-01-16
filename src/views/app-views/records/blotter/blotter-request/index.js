import React, { useState, useEffect, useRef } from "react";
import { setLocalStorage } from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
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
  message,
} from "antd";
import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import BlotterListRequestData from "assets/data/blotter-request.data.json";
import DonutChartWidget from "components/shared-components/DonutChartWidget";
import NumberFormat from "react-number-format";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import UserView from "../blotter-list/UserView";
import { BlotterReportMost } from "../blotter-list/BlotterData";
import { COLORS } from "constants/ChartConstant";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const { Option } = Select;
const categories = ["Pending", "Approved", "Rejected"];

const BlotterRequest = (props) => {
  const { currentOrganization, generateToken } = useAuth();

  const { param_url } = props;
  var history = useHistory();

  const [blotterlistrequest, setBlotterListRequest] = useState([]);
  const [blotterlistrequestData, setBlotterListRequestData] = useState([]);
  const [blotterlistRequestLoading, setBlotterListRequestLoading] = useState(
    true
  );

  const [sessionData, setSessionData] = useState([0, 0, 0]);

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

  useEffect(() => {
    getRecordStatus(currentOrganization);
    getBlotterRequest(currentOrganization);

    setLocalStorage(BLOTTER_FORM, {
      reporters: [],
      victims: [],
      suspects: [],
      respondents: [],
    });
  }, []);

  const getRecordStatus = (currentOrganization) => {
    axios
      .get(
        "/api/blotter_request/record-status/" + currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Record Status", response.data);
        setSessionData(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  // ViewBlotter
  const showUserProfile = (UserList) => {
    SetUserProfileVisible(true);
    SetSelectedUser(UserList);
  };

  const closeUserProfile = () => {
    SetUserProfileVisible(false);
    SetSelectedUser(null);
  };

  const getBlotterRequest = () => {
    axios
      .get(
        "/api/blotter_request/get-blotter-request/" + currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Blotters Request ", response.data);
        setBlotterListRequest(response.data);
        setBlotterListRequestData(response.data);
        setBlotterListRequestLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const deleteBlotterRequest = (_ids) => {
    axios
      .post(
        "/api/blotter_request/delete-blotter-request",
        { _ids },
        generateToken()[1]
      )
      .then((response) => {
        // message.destroy()
        if (response.data == "Success") {
          setSessionData([0, 0, 0]);
          getRecordStatus(currentOrganization);
          return message.success("Successfully Deleted");
        } else {
          return message.error("Error, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        // message.destroy()
        message.error("The action can't be completed, please try again.");
      });
  };

  const blotterRequestColumn = [
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
            style={{ backgroundColor: record.avatarColor }}
          >
            {utils.getNameInitial(record.reporter_name)}
          </Avatar>
          <span className="ml-2">{record.reporter_name}</span>
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
    // {
    // title: "Location",
    // dataIndex: "incidentlocation",
    // sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    // },
    {
      title: "Classification",
      dataIndex: "classification",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    },
    {
      title: () => <div className="text-right">Status</div>,
      key: "status",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <div className="text-right d-flex justify-content-end">
            {/*<Tooltip title="Approve">
              <Button
                className="mr-2 btn-success background"
                icon={<CheckCircleOutlined className="approve" />}
                onClick={() => { }}
                size="small"
              />
		  </Tooltip>*/}
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

  //SEARCH
  const rowSelectionBlotterRequest = {
    onChange: (key, rows) => {
      setSelectedRowsBlotterRequest(rows);
      setSelectedRowKeysBlotterRequest(key);
    },
  };

  const onBlotterRequestSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? blotterlistrequest
      : blotterlistrequestData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterListRequest(data);
    setSelectedRowKeysBlotterRequest([]);
  };

  //EXPORT

  const refreshBlotterRequest = () => {
    console.log("Refresh Blotter Request");
    setBlotterListRequestLoading(true);

    setBlotterListRequest([]);
    getBlotterRequest(currentOrganization);

    setSessionData([0, 0, 0]);
    getRecordStatus(currentOrganization);
  };

  const headers = [
    {
      label: "Blotter ID",
      key: "_id",
    },
    {
      label: "Reporter",
      key: "reporter_name",
    },
    {
      label: "Time Occured",
      key: "time_of_incident",
    },
    {
      label: "Date Occured",
      key: "date_of_incident",
    },
    {
      label: "Date Reported",
      key: "createdAt",
    },
    {
      label: "Schedule Time",
      key: "time_schedule",
    },
    {
      label: "Schedule Date",
      key: "date_schedule",
    },
    {
      label: "Location",
      key: "place_incident",
    },
    {
      label: "Classification",
      key: "incident_type",
    },
    {
      label: "Case",
      key: "settlement_status",
    },
    {
      label: "Status",
      key: "status",
    },
  ];

  const csvLink = useRef(null);

  const BlotterRequestList = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          refreshBlotterRequest();
        }}
      >
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
      <Menu.Item
        key="2"
        onClick={() => {
          csvLink.current.link.click();
        }}
      >
        <span>
          <div className="d-flex align-items-center">
            <FileExcelOutlined />
            <span className="ml-2">Export</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="3" hidden={true}>
        <CSVLink
          ref={csvLink}
          data={blotterlistrequestData}
          headers={headers}
          filename="BlotterRequest.csv"
        >
          Export
        </CSVLink>
      </Menu.Item>
    </Menu>
  );

  const AddBlotterRequest = () => {
    history.push(
      `/app/${currentOrganization}/records/blotter-request-form/add`
    );
  };

  const BlotterRequestDeleteRow = (row) => {
    const objKey = "_id";
    let data = blotterlistrequest;
    if (selectedRowsBlotterRequest.length > 1) {
      selectedRowsBlotterRequest.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setBlotterListRequest(data);
        setSelectedRowsBlotterRequest([]);
      });

      var _ids = [];
      selectedRowsBlotterRequest.map((values) => {
        _ids.push(values._id);
      });

      deleteBlotterRequest(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setBlotterListRequest(data);
      deleteBlotterRequest([row._id]);
    }
  };

  const BlotterCases = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(blotterlistrequestData, key, value);
      setBlotterListRequest(data);
    } else {
      setBlotterListRequest(blotterlistrequestData);
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

  //  RECORD STATUS
  const sessionColor = [COLORS[1], COLORS[7], COLORS[0]];
  const sessionLabels = ["Approved", "Rejected", "Pending"];
  const jointSessionData = () => {
    let arr = [];
    for (let i = 0; i < sessionData.length; i++) {
      const data = sessionData[i];
      const label = sessionLabels[i];
      const color = sessionColor[i];
      arr = [
        ...arr,
        {
          data: data,
          label: label,
          color: color,
          key: i,
        },
      ];
    }
    return arr;
  };
  const conbinedSessionData = jointSessionData();

  const RecordStatus = () => (
    <DonutChartWidget
      series={sessionData}
      labels={sessionLabels}
      title="Record by Status"
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
                  key={elm.key}
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

  // Pending Pending Blotter Request

  const [pendingRequest, setPendingRequest] = useState([]);
  const [pendingRequestData, setPendingRequestData] = useState([]);
  const [pendingRequestLoading, setPendingRequestLoading] = useState(true);

  const [selectedRowsPendingRequest, setSelectedRowsPendingRequest] = useState(
    []
  );

  const [
    selectedRowKeysPendingRequest,
    setSelectedRowKeysPendingRequest,
  ] = useState([]);

  useEffect(() => {
    getPendingBlotterRequest();
  }, []);

  const getPendingBlotterRequest = () => {
    axios
      .get(
        "/api/blotter_request/get-pending-blotter-request/" +
        currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Pending Blotters Request ", response.data);
        setPendingRequest(response.data);
        setPendingRequestData(response.data);
        setPendingRequestLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const approveBlotterRequest = (_ids, data) => {
    axios
      .post(
        "/api/blotter_request/approve-blotter-request",
        { _ids, data },
        generateToken()[1]
      )
      .then((response) => {
        // message.destroy()
        if (response.data == "Success") {
          getBlotterRequest(currentOrganization);

          setSessionData([0, 0, 0]);
          getRecordStatus(currentOrganization);
          setBlotterListRequestLoading(true);
          return message.success("Successfully Approved");
        } else {
          return message.error("Error, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        // message.destroy()
        message.error("The action can't be completed, please try again.");
      });
  };

  const approveBlotterRequestBtn = (row) => {
    const objKey = "_id";
    let data = pendingRequest;

    if (selectedRowsPendingRequest.length > 1) {
      selectedRowsPendingRequest.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setPendingRequest(data);
        setSelectedRowsPendingRequest([]);
      });

      var _ids = [];
      var newBlotterData = selectedRowsPendingRequest;

      selectedRowsPendingRequest.map((values, i) => {
        _ids.push(values._id);
        newBlotterData[i].reporters = [values.reporters[0].resident_id];
      });

      approveBlotterRequest(_ids, newBlotterData);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setPendingRequest(data);

      row.reporters = [row.reporters[0].resident_id];
      approveBlotterRequest([row._id], [row]);
    }
  };

  const rejectBlotterRequest = (_ids) => {
    axios
      .post(
        "/api/blotter_request/reject-blotter-request",
        { _ids },
        generateToken()[1]
      )
      .then((response) => {
        // message.destroy()
        if (response.data == "Success") {
          getBlotterRequest(currentOrganization);

          setSessionData([0, 0, 0]);
          getRecordStatus(currentOrganization);
          setBlotterListRequestLoading(true);
          return message.success("Successfully Approved");
        } else {
          return message.error("Error, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        // message.destroy()
        message.error("The action can't be completed, please try again.");
      });
  };

  const rejectBlotterRequestBtn = (row) => {
    const objKey = "_id";
    let data = pendingRequest;
    if (selectedRowsPendingRequest.length > 1) {
      selectedRowsPendingRequest.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setPendingRequest(data);
        setSelectedRowsPendingRequest([]);
      });

      var _ids = [];
      selectedRowsPendingRequest.map((values) => {
        _ids.push(values._id);
      });

      rejectBlotterRequest(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setPendingRequest(data);
      rejectBlotterRequest([row._id]);
    }
  };

  const pendingRequestColumn = [
    // {
    //   title: "ID",
    //   dataIndex: "blotter_id",
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
    // },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={30}
            className="font-size-sm"
            style={{ backgroundColor: record.avatarColor }}
          >
            {utils.getNameInitial(record.reporter_name)}
          </Avatar>
          <span className="ml-2">{record.reporter_name}</span>
        </div>
      ),
    },

    {
      title: "Date Occured",
      dataIndex: "date_of_incident",
      sorter: (a, b) => utils.antdTableSorter(a, b, "blotter_id"),
      render: (_, record) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(record.date_of_incident).toDateString()}
          </span>
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
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="Approve">
              <Button
                className="mr-2 btn-success background"
                icon={<CheckCircleOutlined className="approve" />}
                onClick={() => {
                  approveBlotterRequestBtn(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip
              title={
                selectedRowKeysPendingRequest.length > 0
                  ? `Reject (${selectedRowKeysPendingRequest.length})`
                  : "Reject"
              }
            >
              <Button
                danger
                icon={<CloseCircleOutlined />}
                className="mr-2"
                onClick={() => {
                  rejectBlotterRequestBtn(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="View">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => {
                  showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  //SEARCH
  const rowSelectionPendingRequest = {
    onChange: (key, rows) => {
      setSelectedRowsPendingRequest(rows);
      setSelectedRowKeysPendingRequest(key);
    },
  };

  const onPendingRequestSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? pendingRequest
      : pendingRequestData;
    const data = utils.wildCardSearch(searchArray, value);
    setPendingRequest(data);
    setSelectedRowKeysPendingRequest([]);
  };

  //EXPORT

  const refreshPendingRequest = () => {
    console.log("Refresh Pending Blotter Request");
    setPendingRequestLoading(true);

    getPendingBlotterRequest(currentOrganization);

    setSessionData([0, 0, 0]);
    getRecordStatus(currentOrganization);
  };

  const pendingRequestList = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          refreshPendingRequest();
        }}
      >
        <span>
          <div className="d-flex align-items-center">
            <ReloadOutlined />
            <span className="ml-2">Refresh</span>
          </div>
        </span>
      </Menu.Item>
    </Menu>
  );

  const pendingRequestDeleteRow = (row) => {
    const objKey = "blotter_id";
    let data = blotterlistrequest;
    if (selectedRowsPendingRequest.length > 1) {
      selectedRowsPendingRequest.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.blotter_id);
        setPendingRequest(data);
        setSelectedRowsPendingRequest([]);
      });

      var _ids = [];
      selectedRowsPendingRequest.map((values) => {
        _ids.push(values._id);
      });

      deleteBlotterRequest(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row.blotter_id);
      setPendingRequest(data);
      deleteBlotterRequest([row._id]);
    }
  };

  // End Pending Pending Blotter Request

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Pending Request"
                extra={cardDropdown(pendingRequestList)}
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
                        onChange={(e) => onPendingRequestSearch(e)}
                      />
                    </div>
                  </Flex>
                </Flex>
                <div className="table-responsive">
                  <Table
                    loading={pendingRequestLoading}
                    columns={pendingRequestColumn}
                    dataSource={pendingRequest}
                    rowKey="_id"
                    scroll={{ x: "max-content" }}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeysPendingRequest,
                      type: "checkbox",
                      preserveSelectedRowKeys: false,
                      ...rowSelectionPendingRequest,
                    }}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                    }}
                  />
                </div>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Blotter Request Record"
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
                  {/* <Flex className="mb-1" mobileFlex={false}>
                    <div className="mb-3 mr-md-3">
                      <Space>
                        <Col>
                          <Button
                            onClick={AddBlotterRequest}
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            block
                          >
                            Test Request Blotter
                          </Button>
                        </Col>
                      </Space>
                    </div>
                  </Flex> */}
                </Flex>
                <div className="table-responsive">
                  <Table
                    loading={blotterlistRequestLoading}
                    columns={blotterRequestColumn}
                    dataSource={blotterlistrequest}
                    rowKey="_id"
                    scroll={{ x: "max-content" }}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeysBlotterRequest,
                      type: "checkbox",
                      preserveSelectedRowKeys: false,
                      ...rowSelectionBlotterRequest,
                    }}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                    }}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <RecordStatus />
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
export default BlotterRequest;
