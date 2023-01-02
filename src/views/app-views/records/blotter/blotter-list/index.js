import React, { useState, useEffect, useRef } from "react";
import { setLocalStorage } from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
import { Col, Card, Table, Tooltip, Select, Input, Button, Menu, Space, Row, Badge, Tag, Avatar, List, message, Dropdown } from 'antd';
import { EyeOutlined, EllipsisOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, FileExcelOutlined, CheckCircleOutlined, PrinterOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
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
import { useAuth } from "contexts/AuthContext";
import { getBlotters, getRecordCases, deleteBlotter } from "api/AppController/BlotterController/BlotterController";

const { Option } = Select;
const categories = ["Scheduled", "Unscheduled", "Settled", "Unsettled"];

const BlotterRecord = (props) => {
  const { currentOrganization, generateToken } = useAuth();

  const { param_url } = props;
  var history = useHistory();

  const [blotters, setBlotters] = useState([]);
  const [blottersData, setBlottersData] = useState([]);
  const [blottersLoading, setBlottersLoading] = useState(true);

  const [selectedRowsBlotter, setSelectedRowsBlotter] = useState([]);
  const [selectedRowKeysBlotter, setSelectedRowKeysBlotter] = useState([]);

  const [blotterVisible, setBlotterVisible] = useState(false);
  const [selectedBlotter, setSelectedBlotter] = useState(null);

  const [sessionData, setSessionData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    getBlottersAndRecordCases();

    setLocalStorage(BLOTTER_FORM, {
      reporters: [],
      victims: [],
      suspects: [],
      respondents: [],
    });
  }, []);

  // Api Calls
  const getBlottersAndRecordCases = () => {
    (async () => {
      const blotters = await getBlotters(currentOrganization, generateToken);
      setBlotters(blotters);
      setBlottersData(blotters);
      setBlottersLoading(false);
      const recordCases = await getRecordCases(currentOrganization, generateToken);
      setSessionData(recordCases);
    })();
  }

  const handleDelete = (_ids) => {
    (async () => {
      const response = await deleteBlotter(_ids, generateToken);
      if (response == "Success") {
        const recordCases = await getRecordCases(currentOrganization, generateToken);
        setSessionData(recordCases);
        return message.success('Successfully Deleted');
      }
    })();
  };

  // View and Close Blotter
  const viewBlotter = (blotters) => {
    setBlotterVisible(true);
    setSelectedBlotter(blotters);
  };

  const closeBlotter = () => {
    setBlotterVisible(false);
    setSelectedBlotter(null);
  };

  const BlotterDropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={0} onClick={() => viewBlotter(row)}>
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
    const searchArray = e.currentTarget.value ? blotters : blottersData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotters(data);
    setSelectedRowKeysBlotter([]);
  };

  //EXPORT
  const refreshBlotter = () => {
    setBlottersLoading(true);

    setBlotters([]);
    setSessionData([0, 0, 0, 0]);

    getBlottersAndRecordCases()
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
          data={blottersData}
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
    let data = blotters;
    if (selectedRowsBlotter.length > 1) {
      selectedRowsBlotter.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setBlotters(data);
        setSelectedRowsBlotter([]);
      });

      var _ids = [];
      selectedRowsBlotter.map((values) => {
        _ids.push(values._id);
      });

      handleDelete(_ids);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setBlotters(data);

      handleDelete([row._id]);
    }
  };

  const BlotterCases = (value) => {
    if (value !== "All") {
      const key = "settlement_status";
      const data = utils.filterArray(blottersData, key, value);
      setBlotters(data);
    } else {
      setBlotters(blottersData);
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

                  <Flex className="mb-1" mobileFlex={false}>
                    <div className="mb-3 mr-md-3">
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
                </Flex>

                <div className="table-responsive">
                  <Table
                    loading={blottersLoading}
                    className="no-border-last"
                    columns={blotterdatacolumn}
                    dataSource={blotters}
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
          {/* <MostReportedBlotter /> */}
        </Col>

        <UserView
          data={selectedBlotter}
          visible={blotterVisible}
          close={() => {
            closeBlotter();
          }}
        />
      </Row>
    </>
  );
};
export default BlotterRecord;
