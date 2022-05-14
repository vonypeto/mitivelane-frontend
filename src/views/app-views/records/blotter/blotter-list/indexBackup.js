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
import UserView from "./UserView";
import { BlotterReportMost } from "./BlotterData";
import { COLORS } from "constants/ChartConstant";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const { Option } = Select;
const categories = ["Scheduled", "Unscheduled", "Settled", "Unsettled"];

const BlotterRecord = (props) => {
  const { currentOrganization, generateToken } = useAuth();

  const { param_url } = props;
  var history = useHistory();

  const [blotterlist, setBlotterList] = useState([]);
  const [blotterlistData, setBlotterlistData] = useState([]);
  const [blotterlistLoading, setBlotterListLoading] = useState(true);

  const [sessionData, setSessionData] = useState([0, 0, 0, 0]);

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
    getBlotters(currentOrganization);
    getRecordCases(currentOrganization);
    getBlotterRequest(currentOrganization);

    setLocalStorage(BLOTTER_FORM, {
      reporters: [],
      victims: [],
      suspects: [],
      respondents: [],
    });
  }, []);

  const getBlotters = (currentOrganization) => {
    axios
      .get(
        "/api/blotter/get-blotters/" + currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Blotters ", response.data);
        setBlotterList(response.data);
        setBlotterlistData(response.data);
        setBlotterListLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const getRecordCases = (currentOrganization) => {
    axios
      .get(
        "/api/blotter/record-cases/" + currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        console.log("Record Cases", response.data);
        setSessionData(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  const deleteBlotter = (_ids) => {
    axios
      .post("/api/blotter/delete-blotter", { _ids }, generateToken()[1])
      .then((response) => {
        // message.destroy()
        if (response.data == "Success") {
          getRecordCases(currentOrganization);
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

  // ViewBlotter
  const showUserProfile = (UserList) => {
    SetUserProfileVisible(true);
    SetSelectedUser(UserList);
  };

  const closeUserProfile = () => {
    SetUserProfileVisible(false);
    SetSelectedUser(null);
  };

  const BlotterDropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={0} onClick={() => showUserProfile(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View</span>
        </Flex>
      </Menu.Item>
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

  //SEARCH
  const rowSelectionBlotter = {
    onChange: (key, rows) => {
      setSelectedRowsBlotter(rows);
      setSelectedRowKeysBlotter(key);
    },
  };

  const onBlotterSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? blotterlist : blotterlistData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterList(data);
    setSelectedRowKeysBlotter([]);
  };

  //EXPORT
  const refreshBlotter = () => {
    console.log("Refresh Blotter");
    setBlotterListLoading(true);

    setBlotterList([]);
    getBlotters(currentOrganization);

    setSessionData([0, 0, 0, 0]);
    getRecordCases(currentOrganization);
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
  ];

  const csvLink = useRef(null);

  const BlotterList = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          refreshBlotter();
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
          data={blotterlistData}
          headers={headers}
          filename="Blotter.csv"
        >
          Export
        </CSVLink>
      </Menu.Item>
    </Menu>
  );

  const AddBlotter = () => {
    history.push(`/app/${currentOrganization}/records/blotter-record/add`);
  };

  const BlottereditwDetails = (row) => {
    setLocalStorage(BLOTTER_FORM, row);
    history.push(
      `/app/${currentOrganization}/records/blotter-record/${row._id}/edit`
    );
  };

  const BlotterDeleteRow = (row) => {
    const objKey = "_id";
    let data = blotterlist;
    if (selectedRowsBlotter.length > 1) {
      selectedRowsBlotter.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setBlotterList(data);
        setSelectedRowsBlotter([]);
      });

      var _ids = [];
      selectedRowsBlotter.map((values) => {
        _ids.push(values._id);
      });

      deleteBlotter(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setBlotterList(data);

      deleteBlotter([row._id]);
    }
  };

  // Blotter Request

  const [blotterlistrequest, setBlotterListRequest] = useState([]);
  const [blotterlistrequestData, setBlotterListRequestData] = useState([]);
  const [blotterlistRequestLoading, setBlotterListRequestLoading] = useState(
    true
  );

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
            style={{ backgroundColor: record.reporters[0].avatarColor }}
          >
            {utils.getNameInitial(record.reporters[0].firstname)}
          </Avatar>
          <span className="ml-2">{record.reporters[0].firstname}</span>
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
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="Approve">
              <Button
                className="mr-2 btn-success background"
                icon={<CheckCircleOutlined className="approve" />}
                onClick={() => {}}
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
      : BlotterListRequestData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterListRequest(data);
    setSelectedRowKeysBlotterRequest([]);
  };

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

  const AddBlotterRequest = () => {
    history.push(
      `/app/${currentOrganization}/records/blotter-request-form/add`
    );
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

      var _ids = [];
      selectedRowsBlotterRequest.map((values) => {
        _ids.push(values._id);
      });

      deleteBlotterRequest(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row.blotter_id);
      setBlotterListRequest(data);
      deleteBlotterRequest([row._id]);
    }
  };

  // End Blotter Request

  const BlotterCases = (value) => {
    if (value !== "All") {
      const key = "settlement_status";
      const data = utils.filterArray(blotterlistData, key, value);
      setBlotterList(data);
    } else {
      setBlotterList(blotterlistData);
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

  //  RECORD CASES
  const sessionColor = [COLORS[0], COLORS[1], COLORS[3], COLORS[5]];
  const sessionLabels = ["Settled", "Scheduled", "Unscheduled", "Unsettled"];
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
        },
      ];
    }
    return arr;
  };
  const conbinedSessionData = jointSessionData();

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
              <Card title="Blotter Records" extra={cardDropdown(BlotterList)}>
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
                          onClick={AddBlotter}
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
                    rowKey="_id"
                    scroll={{ x: "max-content" }}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeysBlotter,
                      type: "checkbox",
                      preserveSelectedRowKeys: false,
                      ...rowSelectionBlotter,
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
